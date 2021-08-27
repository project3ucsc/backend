const { grade } = require("@prisma/client");
const secret = "lakshan";

var sectionmap = new Map();
sectionmap.set(grade.G12MATH, "AL");
sectionmap.set(grade.G12BIO, "AL");
sectionmap.set(grade.G12ART, "AL");
sectionmap.set(grade.G12TECH, "AL");
sectionmap.set(grade.G12COM, "AL");
sectionmap.set(grade.G13COM, "AL");
sectionmap.set(grade.G13MATH, "AL");
sectionmap.set(grade.G13BIO, "AL");
sectionmap.set(grade.G13ART, "AL");
sectionmap.set(grade.G13TECH, "AL");
sectionmap.set(grade.G6, "OL");
sectionmap.set(grade.G7, "OL");
sectionmap.set(grade.G8, "OL");
sectionmap.set(grade.G9, "OL");
sectionmap.set(grade.G10, "OL");
sectionmap.set(grade.G11, "OL");
sectionmap.set(grade.G1, "PRIMARY");
sectionmap.set(grade.G2, "PRIMARY");
sectionmap.set(grade.G3, "PRIMARY");
sectionmap.set(grade.G4, "PRIMARY");
sectionmap.set(grade.G5, "PRIMARY");

module.exports = { secret, sectionmap };
