const Course = require('./course.model');

async function getAllCourses() {
  try {
    const markets = await Course.find();
    return markets;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

async function createCourse(course) {
  try {
    const newCourse = new Course(course);
    const savedCourse = await newCourse.save();
    return savedCourse;
  } catch (error) {
    throw error;
  }
}

async function getCourseById(id) {
  try {
    const course = await Course.findById(id);
    return course;
  } catch (error) {
    throw error;
  }
}

async function updateCourse(id, course) {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(id, course, {
      new: true,
    });

    return updatedCourse;
  } catch (error) {
    throw error;
  }
}

async function deleteCourse(id) {
  try {
    const deletedCourse = await Course.findByIdAndDelete(id);
    return deletedCourse;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
