const {
  getAllCourses,
  createCourse,
  deleteCourse,
  getCourseById,
  updateCourse,
} = require('./course.service');

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

async function createCourseHandler(req, res) {
  const { title, description, teacher } = req.body;
  try {
    if (!title || !description || !teacher) {
      return res.status(422).json({ response: 'Missing values in the body' });
    }

    const course = await createCourse(req.body);
    return res.status(201).json(course);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getCourseByIdHandler(req, res) {
  const { id } = req.params;
  try {
    const course = await getCourseById(id);
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
    const course = await deleteCourse(id);

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

module.exports = {
  getAllCoursesHandler,
  createCourseHandler,
  getCourseByIdHandler,
  updateCourseHandler,
  deleteCourseHandler,
};