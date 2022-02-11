const {
  getAllStudents,
  createStudent,
  deleteStudent,
  getStudentById,
  updateStudent,
} = require('./student.service');

async function getAllStudentsHandler(req, res) {
  try {
    const students = await getAllStudents();

    if (students.length === 0) {
      return res.status(404).json({ message: 'no Courses found' });
    }

    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function createStudentHandler(req, res) {
  const { title, description, teacher } = req.body;
  try {
    if (!title || !description || !teacher) {
      return res.status(422).json({ response: 'Missing values in the body' });
    }

    const student = await createStudent(req.body);
    return res.status(201).json(course);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getStudentByIdHandler(req, res) {
  const { id } = req.params;
  try {
    const student = await getStudentById(id);
    if (!student) {
      return res
        .status(404)
        .json({ message: `product not found with id: ${id}` });
    }

    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function updateStudentHandler(req, res) {
  const { id } = req.params;
  try {
    const {
      name, lastname, email, password, image
    } = req.body;

    if (!name && !lastname && !email && !password && !image) {
      return res.status(422).json({ response: 'Missing values in the body' });
    }

    const student = await updateStudent(id, req.body);

    if (!student) {
      return res
        .status(404)
        .json({ message: `Student not found with id: ${id}` });
    }

    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function deleteStudentHandler(req, res) {
  const { id } = req.params;
  try {
    const student = await deleteStudent(id);

    if (!student) {
      return res
        .status(404)
        .json({ message: `student not found with id: ${id}` });
    }

    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllStudentsHandler,
  createStudentHandler,
  getStudentByIdHandler,
  updateStudentHandler,
  deleteStudentHandler,
};
