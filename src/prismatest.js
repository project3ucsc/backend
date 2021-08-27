const {
  PrismaClient,
  user_role,
  acc_status,
  grade,
  subjectgroup,
} = require("@prisma/client");
const { sectionmap } = require("./helpers/config");

const prisma = new PrismaClient();
// "nodemon": "^2.0.7"
async function main() {
  // const scl = await prisma.school.createMany({
  //   data: [{
  //     name: "Ananda College",
  //     address: "Colomobo 10",
  //   },
  //   {
  //     name: "BCC College",
  //     address: "Colomobo 10",
  //   }]
  // });
  // console.log(scl);
  // const u = await prisma.user.createMany({
  //   data: [
  //     {
  //       id: 1,
  //       username: "lakshan",
  //       password:
  //         "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4",
  //       email: "lakshansandaruwan1998@gmail.com",
  //       phone: null,
  //       gender: null,
  //       role: "STUDENT",
  //       acc_status: "ACTIVE",
  //       school_id: 1,
  //     },
  //     {
  //       id: 2,
  //       username: "sysadmin",
  //       password:
  //         "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4",
  //       email: "jgkkjh@gmail.com",
  //       phone: null,
  //       gender: null,
  //       role: "ADMIN",
  //       acc_status: "ACTIVE",
  //       school_id: 2,
  //     },
  //     {
  //       id: 3,
  //       username: "scladmin",
  //       password:
  //         "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4",
  //       email: "jgklkjkjh@gmail.com",
  //       phone: null,
  //       gender: null,
  //       role: "SCHOOLADMIN",
  //       acc_status: "ACTIVE",
  //       school_id: 2,
  //     },
  //     {
  //       id: 4,
  //       username: "teacher",
  //       password:
  //         "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4",
  //       email: "klkjkjh@gmail.com",
  //       phone: null,
  //       gender: null,
  //       role: "TEACHER",
  //       acc_status: "ACTIVE",
  //       school_id: 2,
  //     },
  //   ],
  // });
  // const u = await prisma.subject.createMany({
  //   data: [
  //     {
  //       grade: grade.G13MATH,
  //       code: "AL-MATHS",
  //       subjectgroup: subjectgroup.COMP,
  //       name: "Combined Mathematics",
  //     },
  //     {
  //       grade: grade.G13MATH,
  //       code: "AL-PHY",
  //       subjectgroup: subjectgroup.COMP,
  //       name: "Physics",
  //     },
  //     {
  //       grade: grade.G13MATH,
  //       code: "AL-CHEM",
  //       subjectgroup: subjectgroup.MATH_CHEM_IT,
  //       name: "Chemistry",
  //     },
  //     {
  //       grade: grade.G13MATH,
  //       code: "AL-ICT",
  //       subjectgroup: subjectgroup.MATH_CHEM_IT,
  //       name: "Information Technology",
  //     },
  //     {
  //       grade: grade.G13MATH,
  //       code: "AL-GEN-ENG",
  //       subjectgroup: subjectgroup.COMP,
  //       name: "General English",
  //     },
  //  {
  //       grade: grade.G13BIO,
  //       code: "AL-BIO",
  //       subjectgroup: subjectgroup.COMP,
  //       name: "Biology",
  //     },
  //     {
  //       grade: grade.G13BIO,
  //       code: "AL-PHY",
  //       subjectgroup: subjectgroup.BIO_PHY_AGRI,
  //       name: "Physics",
  //     },
  //     {
  //       grade: grade.G13BIO,
  //       code: "AL-CHEM",
  //       subjectgroup: subjectgroup.COMP,
  //       name: "Chemistry",
  //     },
  //     {
  //       grade: grade.G13BIO,
  //       code: "AL-AGRI",
  //       subjectgroup: subjectgroup.BIO_PHY_AGRI,
  //       name: "Information Technology",
  //     },
  //     {
  //       grade: grade.G13BIO,
  //       code: "AL-GEN-ENG",
  //       subjectgroup: subjectgroup.COMP,
  //       name: "General English",
  //     },
  //     {
  //       grade: grade.G12BIO,
  //       code: "AL-BIO",
  //       subjectgroup: subjectgroup.COMP,
  //       name: "Biology",
  //     },
  //     {
  //       grade: grade.G12BIO,
  //       code: "AL-PHY",
  //       subjectgroup: subjectgroup.BIO_PHY_AGRI,
  //       name: "Physics",
  //     },
  //     {
  //       grade: grade.G12BIO,
  //       code: "AL-CHEM",
  //       subjectgroup: subjectgroup.COMP,
  //       name: "Chemistry",
  //     },
  //     {
  //       grade: grade.G12BIO,
  //       code: "AL-AGRI",
  //       subjectgroup: subjectgroup.BIO_PHY_AGRI,
  //       name: "Information Technology",
  //     },
  //     {
  //       grade: grade.G12BIO,
  //       code: "AL-GEN-ENG",
  //       subjectgroup: subjectgroup.COMP,
  //       name: "General English",
  //     },
  // {
  //    grade: grade.G11,
  //       code: "NULL",
  //       subjectgroup: subjectgroup.COMP,
  //       name: "Maths",
  //     },
  //     {
  //       grade: grade.G11,
  //       code: "NULL",
  //       subjectgroup: subjectgroup.COMP,
  //       name: "Sinhala",
  //     },
  //     {
  //       grade: grade.G11,
  //       code: "NULL",
  //       subjectgroup: subjectgroup.COMP,
  //       name: "History",
  //     },
  //     {
  //       grade: grade.G11,
  //       code: "NULL",
  //       subjectgroup: subjectgroup.COMP,
  //       name: "English",
  //     },
  //     {
  //       grade: grade.G11,
  //       code: "NULL",
  //       subjectgroup: subjectgroup.COMP,
  //       name: "Science",
  //     },
  //     {
  //       grade: grade.G11,
  //       code: "NULL",
  //       subjectgroup: subjectgroup.OL_BUCKET_1,
  //       name: "Buddhism",
  //     },
  //     {
  //       grade: grade.G11,
  //       code: "NULL",
  //       subjectgroup: subjectgroup.OL_BUCKET_1,
  //       name: "Geology",
  //     },
  //     {
  //       grade: grade.G11,
  //       code: "NULL",
  //       subjectgroup: subjectgroup.OL_BUCKET_1,
  //       name: "Civics",
  //     },
  //     {
  //       grade: grade.G11,
  //       code: "NULL",
  //       subjectgroup: subjectgroup.OL_BUCKET_3,
  //       name: "Health",
  //     },
  //     {
  //       grade: grade.G11,
  //       code: "NULL",
  //       subjectgroup: subjectgroup.OL_BUCKET_3,
  //       name: "Media",
  //     },
  //     {
  //       grade: grade.G11,
  //       code: "NULL",
  //       subjectgroup: subjectgroup.OL_BUCKET_2,
  //       name: "Eastern Music",
  //     },
  //     {
  //       grade: grade.G11,
  //       code: "NULL",
  //       subjectgroup: subjectgroup.OL_BUCKET_2,
  //       name: "Western Music",
  //     },
  //     {
  //       grade: grade.G11,
  //       code: "NULL",
  //       subjectgroup: subjectgroup.OL_BUCKET_2,
  //       name: "Arts",
  //     },
  //     {
  //       grade: grade.G11,
  //       code: "NULL",
  //       subjectgroup: subjectgroup.OL_BUCKET_2,
  //       name: "Dancing",
  //     },
  //     {
  //       grade: grade.G11,
  //       code: "NULL",
  //       subjectgroup: subjectgroup.OL_BUCKET_2,
  //       name: "Drama",
  //     },
  //     {
  //       grade: grade.G11,
  //       code: "NULL",
  //       subjectgroup: subjectgroup.OL_BUCKET_3,
  //       name: "ICT",
  //     },
  //     {
  //       grade: grade.G11,
  //       code: "NULL",
  //       subjectgroup: subjectgroup.OL_BUCKET_2,
  //       name: "English Literature",
  //     },
  //     {
  //       grade: grade.G11,
  //       code: "NULL",
  //       subjectgroup: subjectgroup.OL_BUCKET_2,
  //       name: "Sinhala Literature",
  //     },
  //   {
  //   grade: grade.G9,
  //   code: "NULL",
  //   subjectgroup: subjectgroup.COMP,
  //   name: "Maths",
  // },
  // {
  //   grade: grade.G9,
  //   code: "NULL",
  //   subjectgroup: subjectgroup.COMP,
  //   name: "Sinhala",
  // },
  // {
  //   grade: grade.G9,
  //   code: "NULL",
  //   subjectgroup: subjectgroup.COMP,
  //   name: "History",
  // },
  // {
  //   grade: grade.G9,
  //   code: "NULL",
  //   subjectgroup: subjectgroup.COMP,
  //   name: "English",
  // },
  // {
  //   grade: grade.G9,
  //   code: "NULL",
  //   subjectgroup: subjectgroup.COMP,
  //   name: "Science",
  // },
  // {
  //   grade: grade.G9,
  //   code: "NULL",
  //   subjectgroup: subjectgroup.OPTIONAL_69,
  //   name: "Buddhism",
  // },
  // {
  //   grade: grade.G9,
  //   code: "NULL",
  //   subjectgroup: subjectgroup.COMP,
  //   name: "Geology",
  // },
  // {
  //   grade: grade.G9,
  //   code: "NULL",
  //   subjectgroup: subjectgroup.COMP,
  //   name: "Civics",
  // },
  // {
  //   grade: grade.G9,
  //   code: "NULL",
  //   subjectgroup: subjectgroup.COMP,
  //   name: "Health",
  // },
  // {
  //   grade: grade.G9,
  //   code: "NULL",
  //   subjectgroup: subjectgroup.OPTIONAL_69,
  //   name: "Eastern Music",
  // },
  // {
  //   grade: grade.G9,
  //   code: "NULL",
  //   subjectgroup: subjectgroup.OPTIONAL_69,
  //   name: "Western Music",
  // },
  // {
  //   grade: grade.G9,
  //   code: "NULL",
  //   subjectgroup: subjectgroup.OPTIONAL_69,
  //   name: "Arts",
  // },
  // {
  //   grade: grade.G9,
  //   code: "NULL",
  //   subjectgroup: subjectgroup.OPTIONAL_69,
  //   name: "Dancing",
  // },
  // {
  //   grade: grade.G9,
  //   code: "NULL",
  //   subjectgroup: subjectgroup.OPTIONAL_69,
  //   name: "Drama",
  // },
  // {
  //   grade: grade.G9,
  //   code: "NULL",
  //   subjectgroup: subjectgroup.OPTIONAL_69,
  //   name: "ICT",
  // },
  // {
  //   grade: grade.G9,
  //   code: "NULL",
  //   subjectgroup: subjectgroup.OPTIONAL_69,
  //   name: "PTS",
  // },
  //   ],
  // });
  // const user = await prisma.subject_detail.create({
  //   data: {
  //     classid: 1,
  //     subjectid: 1,
  //     teacher_id: 4,
  //     tsid: 2,
  //   },
  // });
  // const user = await prisma.freeprogs.createMany({
  //   data: [
  //     {
  //       title: "Gurugedara",
  //       discription: "Every Friday at 4.00pm on National Television",
  //       imgurl:
  //         "https://lakfreedom.info/images/vthumbs/guru-gedara-geography-(a-l).jpg",
  //       rating: 3,
  //       ratecount: 1,
  //     },
  //     {
  //       title: "Gurugedara",
  //       discription: "Every Sunday at 4.00pm on National Television",
  //       imgurl:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIRHQHiKg52uwIG7yChx7lSxbqPIzydG1Lhw&usqp=CAU",
  //       rating: 2.5,
  //       ratecount: 1,
  //     },
  //     {
  //       title: "E-thaksalawa",
  //       discription: "Every Friday at 6.00pm on ITN",
  //       imgurl:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSbUTbI0CRqQzdniUZmYDg2ffj757CRso5zvBM2MBoLgzHaBmv-HrlipECXlSXt5biI44&usqp=CAU",
  //       rating: 3,
  //       ratecount: 1,
  //     },
  //     {
  //       title: "BrainHub",
  //       discription: "Every Friday at 4.00pm on National Television",
  //       imgurl: "https://i.ytimg.com/vi/GC67h_ut7xU/hqdefault.jpg",
  //       rating: 5,
  //       ratecount: 1,
  //     },
  //     {
  //       title: "Math Class",
  //       discription: "Every Friday at 4.30am on EYE Channel",
  //       imgurl:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_0_y05PCYb3baWtWohc3tQWdXUotbENXhKDyPSYbWCkJcXx5hW5CQPiTFqk2QMe_z9Q&usqp=CAU",
  //       rating: 3.5,
  //       ratecount: 1,
  //     },
  //     {
  //       title: "Gurugedara",
  //       discription: "Every Monday at 4.00pm on National Television",
  //       rating: 3.5,
  //       ratecount: 1,
  //       imgurl:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLTB-PzoDz7eufXBKQMwhDBWm2yXVtErL07RuBX8Uz9Vsx2oJgl4rM55u0O-mRs6f_sA&usqp=CAU",
  //     },
  //     {
  //       title: "BrainHub",
  //       discription: "Every Friday at 4.30am on EYE Channel",
  //       rating: 3,
  //       ratecount: 1,
  //       imgurl:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRntsyo_9qRARQ0r_cMitrDJu_SGp26QZY95a6rcMDYLirlTWv1CwHmNap_b8j1cSkHdg&usqp=CAU",
  //     },
  //     {
  //       title: "ScienceHub",
  //       discription: "Every Sunday at 4.00pm on EYE Channel",
  //       rating: 5,
  //       ratecount: 1,
  //       imgurl:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH85zmpMPHGgl2i8b1idBKWSWKaAb9v5tUI_hiDrQvgb5hMT2pCcQJWWhWdSar0Q_pHz4&usqp=CAU",
  //     },
  //   ],
  // });
  // get the periods in school , section
  // console.log(new Date("1970-01-01T03:40:00.000Z").toLocaleTimeString());
  // console.log(period[0].starttime <= period[0].endtime);



  

}
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
