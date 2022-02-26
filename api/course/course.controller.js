const {
  getAllCourses,
  createCourse,
  deleteCourse,
  getCourseById,
  updateCourse,
  getCoursesByRhythm
} = require('./course.service');

const User = require('../user/user.model')

const { updateUser, getUserById } = require('../user/user.service')

// const { getPaymentById } = require('../payment/payment.service')

const Course = require('./course.model');

async function getAllCoursesHandler(req, res) {
  try {
    const courses = await getAllCourses();

    if (courses.length === 0) {
      return res.status(404).json({ message: 'no Courses found' });
    }

    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getAllCoursesByUserHandler(req, res) {
  const courses = []
  try {
    const coursesReq = req.user.courseId
    for (const item of coursesReq) {
      const course = await getCourseById(item);
      courses.push(course)
    }
    return res.status(200).json(courses);
  } catch (err) {
    return res.status(500).json({ error: error.message });
  }
}

async function getAllCoursesByRhythmHandler(req, res) {
  const { rhythm } = req.params;
  try {
    const courses = await getCoursesByRhythm(rhythm);
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function createCourseHandler(req, res) {
  const { title, description, teacher } = req.body;
  const { _id } = req.user
  try {
    if (!title || !description || !teacher) {
      return res.status(422).json({ response: 'Missing values in the body' });
    }
    const course = await createCourse(req.body);

    const courseNew = {
      courseId: [...req.user.courseId, course._id]
    }
    const update = await updateUser(_id, courseNew)

    return res.status(201).json(course);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getCourseByIdHandler(req, res) {
  console.log('entre')
  const { id } = req.params;
  try {
    const course = await getCourseById(id);
    console.log('course', course)
    if (!course) {
      return res
        .status(404)
        .json({ message: `course not found with id: ${id}` });
    }

    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function updateCourseHandler(req, res) {
  const { id } = req.params;
  try {
    const {
      title, description, teacher, image, address, rhythm,
    } = req.body;

    if (!title && !description && !teacher && !image && !address && !rhythm) {
      return res.status(422).json({ response: 'Missing values in the body' });
    }

    const course = await updateCourse(id, req.body);

    if (!course) {
      return res
        .status(404)
        .json({ message: `product not found with id: ${id}` });
    }

    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function deleteCourseHandler(req, res) {
  const { id } = req.params;

  try {
    const course = await getCourseById(id);

    if (!course) {
      return res
        .status(404)
        .json({ message: `course not found with id: ${id}` });
    }

    await User.updateOne({ _id: req.user._id }, {
      $pull: {
        courseId: course._id,
      },
    }, { new: true });

   await deleteCourse(id);

    return res.status(200)
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function updateCoursePaymentIdHandler(req, res) {
  // const { _id } = req.body
  //  const { user } = req;
  const { _idCourse, _idPayment } = req.body
  //  console.log('user', user)
  try {
    const course = await getCourseById(_idCourse);
    // const payment = await getPaymentById(_idPayment);

    const updatedCourse = await Course.findByIdAndUpdate({ _id: course._id },
      { $push: { 'paymentId': _idPayment } }, { upsert: true, new: true })

    return res.json(updatedCourse)
  } catch (err) {
    console.log('err', err)
  }
}

module.exports = {
  getAllCoursesHandler,
  createCourseHandler,
  getCourseByIdHandler,
  updateCourseHandler,
  deleteCourseHandler,
  updateCoursePaymentIdHandler,
  getAllCoursesByRhythmHandler,
  getAllCoursesByUserHandler
};
