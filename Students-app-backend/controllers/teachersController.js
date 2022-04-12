const Teachers = require("./../models/teachersModel");

// Gauti visus mokytojus
exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teachers.find();//db pvd
        res.status(200).json({
            status: "success",
            results: teachers.length,
            data: {
                teachers: teachers,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};

// Sukurti mokytoją
exports.createTeachers = async (req, res) => {
    try {
        const newTeachers = await Teachers.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                teacher: newTeachers,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err,
        });
    }
};

// Gauti mokytoją pagal ID
exports.getTeachersById = async (req, res) => {
    try {
        const teacher = await Teachers.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                teachers: teacher,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};

// Atnaujinti esamą mokytoją
exports.updateTeachers = async (req, res) => {
    try {
        const teacher = await Teachers.findByIdAndUpdate(req.params.id, req.body, {
            // atnaujinus duomenis - gauti atnaujintą mokytojo informaciją
            new: true,
            // papildomai patikrintų duomenis pagal DB schemą (teacherModel)
            runValidators: true,
        });

        res.status(200).json({
            status: "success",
            data: {
                teacher: teacher,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};

// Pašalinti mokytoją pagal ID
exports.deleteTeachers = async (req, res) => {
    try {
        await Teachers.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: "success",
            data: null,
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};