const { STATUS_CODES } = require('@/constants');
const Group = require('@/models/group.model');
const AppError = require('@/utils/appError');
const CatchAsync = require('@/utils/catchAsync');

const index = CatchAsync(async (req, res, next) => {
  let { page, pageSize, priority, createdAt, totalTask } = req.data.query;
  const filter = {
    userId: req.user._id,
    deletedAt: null,
    ...(priority && { priority }),
  };
  const sort = {
    ...(createdAt && { createdAt: createdAt || 'asc' }),
    ...(totalTask && { totalTask }),
  };

  if (!page) page = 1;
  if (!pageSize) pageSize = 10;
  const skip = +pageSize * (+page - 1);

  const result = await Group.find(filter).sort(sort).skip(skip).limit(pageSize);

  const totalPage = Math.ceil((await Group.count(filter)) / pageSize);

  res.result = {
    data: result,
    paginationInfo: {
      page,
      pageSize,
      totalPage,
    },
  };
  return next(res);
});

const store = CatchAsync(async (req, res, next) => {
  const input = { ...req.data.body, userId: req.user._id };
  await Group.create(input);
  res.result = { statusCode: 201, code: STATUS_CODES.CREATED };
  next(res);
});

const show = CatchAsync(async (req, res, next) => {
  const result = await Group.findOne({ _id: req.data.params.id, deletedAt: null });
  if (!result) return next(new AppError(STATUS_CODES.NODE_FOUND, 404));
  res.result = { data: result };
  return next(res);
});

const update = CatchAsync(async (req, res, next) => {
  const group = await Group.findOneAndUpdate(
    {
      _id: req.data.params.id,
      userId: req.user._id,
      deletedAt: null,
    },
    { ...req.data.body },
  );

  if (!group) return next(new AppError(STATUS_CODES.NODE_FOUND, 404));
  res.result = {};
  return next(res);
});

const updateMany = CatchAsync(async (req, res, next) => {
  const { groups } = req.data.body;
  await Promise.all(
    groups.map((group) => {
      Group.findOneAndUpdate(
        {
          _id: group.id,
          userId: req.user._id,
        },
        {
          priority: group.priority,
        },
      );
    }),
  );
  res.result = {};
  return next(res);
});

const remove = CatchAsync(async (req, res, next) => {
  const { groups } = req.data.body;
  await Group.updateMany(
    {
      userId: req.user._id,
      _id: { $in: groups },
      deletedAt: null,
    },
    {
      deletedAt: new Date(),
    },
  );
  res.result = {};
  return next(res);
});

const removeOne = CatchAsync(async (req, res, next) => {
  const { id } = req.data.params;
  await Group.deleteOne({ _id: id, userId: req.user._id });
  res.result = {};
  return next(res);
});

const restore = CatchAsync(async (req, res, next) => {
  const { groups } = req.data.body;

  await Group.updateMany(
    {
      userId: req.user._id,
      _id: { $in: groups },
      deletedAt: { $ne: null },
    },
    {
      deletedAt: null,
    },
  );

  res.result = {};
  return next(res);
});

const destroy = CatchAsync(async (req, res, next) => {
  const { groups } = req.data.body;
  await Group.deleteMany({
    userId: req.user._id,
    id: { $in: groups },
    deletedAt: { $ne: null },
  });

  res.result = {
    statusCode: 204,
    code: STATUS_CODES.DELETED,
  };

  return next(res);
});

module.exports = { index, store, show, update, updateMany, remove, removeOne, restore, destroy };
