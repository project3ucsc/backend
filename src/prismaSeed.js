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
  //   const scl = await prisma.school.createMany({
  //     data: [{
  //       name: "Ananda College",
  //       address: "Colomobo 10",
  //     },
  //     {
  //       name: "BCC College",
  //       address: "Colomobo 10",
  //     }]
  //   });

  //  await prisma.user.createMany({
  //     data: [
  //       {
  //         id: 1,
  //         username: 'lakshan',
  //         password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
  //         email: '2018cs073@stu.ucsc.cmb.ac.lk',
  //         phone: '+10701549225',
  //         gender: 'm',
  //         role: 'STUDENT',
  //         acc_status: 'ACTIVE',
  //         school_id: 1
  //       },
  //       {
  //         id: 2,
  //         username: 'sysadmin',
  //         password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
  //         email: 'admin@gmail.com',
  //         phone: null,
  //         gender: null,
  //         role: 'ADMIN',
  //         acc_status: 'ACTIVE',
  //         school_id: 1
  //       },
  //       {
  //         id: 3,
  //         username: 'scladmin',
  //         password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
  //         email: 'scladmin@gmail.com',
  //         phone: null,
  //         gender: null,
  //         role: 'SCHOOLADMIN',
  //         acc_status: 'ACTIVE',
  //         school_id: 1
  //       },
  //       {
  //         id: 4,
  //         username: 'Mr.Nimal Perera',
  //         password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
  //         email: 'nimal@gmail.com',
  //         phone: null,
  //         gender: null,
  //         role: 'TEACHER',
  //         acc_status: 'ACTIVE',
  //         school_id: 1
  //       },
  //       {
  //         id: 5,
  //         username: 'jon poal',
  //         password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
  //         email: 'jonpoalus@gmail.com',
  //         phone: '0701549234',
  //         gender: 'm',
  //         role: 'STUDENT',
  //         acc_status: 'ACTIVE',
  //         school_id: 1
  //       },
  //       {
  //         id: 6,
  //         username: 'Lakshan Sandaruwan',
  //         password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
  //         email: 'lakshansandarwan1998@gmail.com',
  //         phone: '+94701549225',
  //         gender: 'm',
  //         role: 'STUDENT',
  //         acc_status: 'ACTIVE',
  //         school_id: 1
  //       },
  //       {
  //         id: 7,
  //         username: 'Mrs. Kasuni Fernando',
  //         password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
  //         email: 'kasuni@gmail.com',
  //         phone: null,
  //         gender: null,
  //         role: 'TEACHER',
  //         acc_status: 'ACTIVE',
  //         school_id: 1
  //       },
  //       {
  //         id: 8,
  //         username: 'Ms. Shamali Rodrigo',
  //         password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
  //         email: 'shamali@gmail.com',
  //         phone: null,
  //         gender: null,
  //         role: 'TEACHER',
  //         acc_status: 'ACTIVE',
  //         school_id: 1
  //       },
  //       {
  //         id: 9,
  //         username: 'balala',
  //         password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
  //         email: '123@gmail.com',
  //         phone: '0701549',
  //         gender: 'o',
  //         role: 'STUDENT',
  //         acc_status: 'ACTIVE',
  //         school_id: 1
  //       },
  //       {
  //         id: 10,
  //         username: 'lakshan',
  //         password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
  //         email: 'lakshansandaruwan1998@gmail.com',
  //         phone: '+947015',
  //         gender: 'm',
  //         role: 'STUDENT',
  //         acc_status: 'ACTIVE',
  //         school_id: 1
  //       },
  //       {
  //         id: 11,
  //         username: 'Mr. D.S. Athukorala ',
  //         password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
  //         email: 'athukorala@gmail.com',
  //         phone: '213154',
  //         gender: 'M',
  //         role: 'TEACHER',
  //         acc_status: 'ACTIVE',
  //         school_id: 1
  //       },
  //       {
  //         id: 13,
  //         username: 'Mr. Pradeep Jayasoor',
  //         password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
  //         email: 'pradeep@gmail.com',
  //         phone: '213154',
  //         gender: 'M',
  //         role: 'TEACHER',
  //         acc_status: 'ACTIVE',
  //         school_id: 1
  //       }
  //     ],
  //   });

  //  await prisma.freeprogs.createMany({
  //     data: [
  //       {
  //         title: "Gurugedara",
  //         discription: "Every Friday at 4.00pm on National Television",
  //         imgurl:
  //           "https://lakfreedom.info/images/vthumbs/guru-gedara-geography-(a-l).jpg",
  //         rating: 3,
  //         ratecount: 1,
  //       },
  //       {
  //         title: "Gurugedara",
  //         discription: "Every Sunday at 4.00pm on National Television",
  //         imgurl:
  //           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIRHQHiKg52uwIG7yChx7lSxbqPIzydG1Lhw&usqp=CAU",
  //         rating: 2.5,
  //         ratecount: 1,
  //       },
  //       {
  //         title: "E-thaksalawa",
  //         discription: "Every Friday at 6.00pm on ITN",
  //         imgurl:
  //           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSbUTbI0CRqQzdniUZmYDg2ffj757CRso5zvBM2MBoLgzHaBmv-HrlipECXlSXt5biI44&usqp=CAU",
  //         rating: 3,
  //         ratecount: 1,
  //       },
  //       {
  //         title: "BrainHub",
  //         discription: "Every Friday at 4.00pm on National Television",
  //         imgurl: "https://i.ytimg.com/vi/GC67h_ut7xU/hqdefault.jpg",
  //         rating: 5,
  //         ratecount: 1,
  //       },
  //       {
  //         title: "Math Class",
  //         discription: "Every Friday at 4.30am on EYE Channel",
  //         imgurl:
  //           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_0_y05PCYb3baWtWohc3tQWdXUotbENXhKDyPSYbWCkJcXx5hW5CQPiTFqk2QMe_z9Q&usqp=CAU",
  //         rating: 3.5,
  //         ratecount: 1,
  //       },
  //       {
  //         title: "Gurugedara",
  //         discription: "Every Monday at 4.00pm on National Television",
  //         rating: 3.5,
  //         ratecount: 1,
  //         imgurl:
  //           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLTB-PzoDz7eufXBKQMwhDBWm2yXVtErL07RuBX8Uz9Vsx2oJgl4rM55u0O-mRs6f_sA&usqp=CAU",
  //       },
  //       {
  //         title: "BrainHub",
  //         discription: "Every Friday at 4.30am on EYE Channel",
  //         rating: 3,
  //         ratecount: 1,
  //         imgurl:
  //           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRntsyo_9qRARQ0r_cMitrDJu_SGp26QZY95a6rcMDYLirlTWv1CwHmNap_b8j1cSkHdg&usqp=CAU",
  //       },
  //       {
  //         title: "ScienceHub",
  //         discription: "Every Sunday at 4.00pm on EYE Channel",
  //         rating: 5,
  //         ratecount: 1,
  //         imgurl:
  //           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH85zmpMPHGgl2i8b1idBKWSWKaAb9v5tUI_hiDrQvgb5hMT2pCcQJWWhWdSar0Q_pHz4&usqp=CAU",
  //       },
  //     ],
  //   });

  // const sub = JSON.parse(
  //   '[{"id":1,"code":"AL-MAT","grade":"G12MATH","subjectgroup":"COMP","name":"Com.Maths"},{"id":2,"code":"AL-PHY","grade":"G12MATH","subjectgroup":"COMP","name":"Physics"},{"id":3,"code":"AL-CHE","grade":"G12MATH","subjectgroup":"MATH_CHEM_IT","name":"Chemistry"},{"id":4,"code":"AL-ICT","grade":"G12MATH","subjectgroup":"MATH_CHEM_IT","name":"ICT"},{"id":5,"code":"AL-GEN","grade":"G12MATH","subjectgroup":"COMP","name":"General English"},{"id":6,"code":"AL-MAT","grade":"G13MATH","subjectgroup":"COMP","name":"Com.Maths"},{"id":7,"code":"AL-PHY","grade":"G13MATH","subjectgroup":"COMP","name":"Physics"},{"id":8,"code":"AL-CHE","grade":"G13MATH","subjectgroup":"MATH_CHEM_IT","name":"Chemistry"},{"id":9,"code":"AL-ICT","grade":"G13MATH","subjectgroup":"MATH_CHEM_IT","name":"ICT"},{"id":10,"code":"AL-GEN","grade":"G13MATH","subjectgroup":"COMP","name":"General English"},{"id":11,"code":"AL-BIO","grade":"G13BIO","subjectgroup":"COMP","name":"Biology"},{"id":12,"code":"AL-PHY","grade":"G13BIO","subjectgroup":"BIO_PHY_AGRI","name":"Physics"},{"id":13,"code":"AL-CHE","grade":"G13BIO","subjectgroup":"COMP","name":"Chemistry"},{"id":14,"code":"AL-AGR","grade":"G13BIO","subjectgroup":"BIO_PHY_AGRI","name":"Agriculture"},{"id":15,"code":"AL-GEN","grade":"G13BIO","subjectgroup":"COMP","name":"General English"},{"id":16,"code":"AL-BIO","grade":"G12BIO","subjectgroup":"COMP","name":"Biology"},{"id":17,"code":"AL-PHY","grade":"G12BIO","subjectgroup":"BIO_PHY_AGRI","name":"Physics"},{"id":18,"code":"AL-CHE","grade":"G12BIO","subjectgroup":"COMP","name":"Chemistry"},{"id":19,"code":"AL-AGR","grade":"G12BIO","subjectgroup":"BIO_PHY_AGRI","name":"Agriculture"},{"id":20,"code":"AL-GEN","grade":"G12BIO","subjectgroup":"COMP","name":"General English"},{"id":21,"code":"NULL","grade":"G6","subjectgroup":"COMP","name":"Maths"},{"id":22,"code":"NULL","grade":"G6","subjectgroup":"COMP","name":"Sinhala"},{"id":23,"code":"NULL","grade":"G6","subjectgroup":"COMP","name":"History"},{"id":24,"code":"NULL","grade":"G6","subjectgroup":"COMP","name":"English"},{"id":25,"code":"NULL","grade":"G6","subjectgroup":"COMP","name":"Science"},{"id":26,"code":"NULL","grade":"G6","subjectgroup":"OPTIONAL_69","name":"Buddhism"},{"id":27,"code":"NULL","grade":"G6","subjectgroup":"COMP","name":"Geology"},{"id":28,"code":"NULL","grade":"G6","subjectgroup":"COMP","name":"Civics"},{"id":29,"code":"NULL","grade":"G6","subjectgroup":"COMP","name":"Health"},{"id":30,"code":"NULL","grade":"G6","subjectgroup":"OPTIONAL_69","name":"Eastern Music"},{"id":31,"code":"NULL","grade":"G6","subjectgroup":"OPTIONAL_69","name":"Western Music"},{"id":32,"code":"NULL","grade":"G6","subjectgroup":"OPTIONAL_69","name":"Arts"},{"id":33,"code":"NULL","grade":"G6","subjectgroup":"OPTIONAL_69","name":"Dancing"},{"id":34,"code":"NULL","grade":"G6","subjectgroup":"OPTIONAL_69","name":"Drama"},{"id":35,"code":"NULL","grade":"G6","subjectgroup":"OPTIONAL_69","name":"ICT"},{"id":36,"code":"NULL","grade":"G6","subjectgroup":"OPTIONAL_69","name":"PTS"},{"id":37,"code":"NULL","grade":"G7","subjectgroup":"COMP","name":"Maths"},{"id":38,"code":"NULL","grade":"G7","subjectgroup":"COMP","name":"Sinhala"},{"id":39,"code":"NULL","grade":"G7","subjectgroup":"COMP","name":"History"},{"id":40,"code":"NULL","grade":"G7","subjectgroup":"COMP","name":"English"},{"id":41,"code":"NULL","grade":"G7","subjectgroup":"COMP","name":"Science"},{"id":42,"code":"NULL","grade":"G7","subjectgroup":"OPTIONAL_69","name":"Buddhism"},{"id":43,"code":"NULL","grade":"G7","subjectgroup":"COMP","name":"Geology"},{"id":44,"code":"NULL","grade":"G7","subjectgroup":"COMP","name":"Civics"},{"id":45,"code":"NULL","grade":"G7","subjectgroup":"COMP","name":"Health"},{"id":46,"code":"NULL","grade":"G7","subjectgroup":"OPTIONAL_69","name":"Eastern Music"},{"id":47,"code":"NULL","grade":"G7","subjectgroup":"OPTIONAL_69","name":"Western Music"},{"id":48,"code":"NULL","grade":"G7","subjectgroup":"OPTIONAL_69","name":"Arts"},{"id":49,"code":"NULL","grade":"G7","subjectgroup":"OPTIONAL_69","name":"Dancing"},{"id":50,"code":"NULL","grade":"G7","subjectgroup":"OPTIONAL_69","name":"Drama"},{"id":51,"code":"NULL","grade":"G7","subjectgroup":"OPTIONAL_69","name":"ICT"},{"id":52,"code":"NULL","grade":"G7","subjectgroup":"OPTIONAL_69","name":"PTS"},{"id":53,"code":"NULL","grade":"G8","subjectgroup":"COMP","name":"Maths"},{"id":54,"code":"NULL","grade":"G8","subjectgroup":"COMP","name":"Sinhala"},{"id":55,"code":"NULL","grade":"G8","subjectgroup":"COMP","name":"History"},{"id":56,"code":"NULL","grade":"G8","subjectgroup":"COMP","name":"English"},{"id":57,"code":"NULL","grade":"G8","subjectgroup":"COMP","name":"Science"},{"id":58,"code":"NULL","grade":"G8","subjectgroup":"OPTIONAL_69","name":"Buddhism"},{"id":59,"code":"NULL","grade":"G8","subjectgroup":"COMP","name":"Geology"},{"id":60,"code":"NULL","grade":"G8","subjectgroup":"COMP","name":"Civics"},{"id":61,"code":"NULL","grade":"G8","subjectgroup":"COMP","name":"Health"},{"id":62,"code":"NULL","grade":"G8","subjectgroup":"OPTIONAL_69","name":"Eastern Music"},{"id":63,"code":"NULL","grade":"G8","subjectgroup":"OPTIONAL_69","name":"Western Music"},{"id":64,"code":"NULL","grade":"G8","subjectgroup":"OPTIONAL_69","name":"Arts"},{"id":65,"code":"NULL","grade":"G8","subjectgroup":"OPTIONAL_69","name":"Dancing"},{"id":66,"code":"NULL","grade":"G8","subjectgroup":"OPTIONAL_69","name":"Drama"},{"id":67,"code":"NULL","grade":"G8","subjectgroup":"OPTIONAL_69","name":"ICT"},{"id":68,"code":"NULL","grade":"G8","subjectgroup":"OPTIONAL_69","name":"PTS"},{"id":69,"code":"NULL","grade":"G9","subjectgroup":"COMP","name":"Maths"},{"id":70,"code":"NULL","grade":"G9","subjectgroup":"COMP","name":"Sinhala"},{"id":71,"code":"NULL","grade":"G9","subjectgroup":"COMP","name":"History"},{"id":72,"code":"NULL","grade":"G9","subjectgroup":"COMP","name":"English"},{"id":73,"code":"NULL","grade":"G9","subjectgroup":"COMP","name":"Science"},{"id":74,"code":"NULL","grade":"G9","subjectgroup":"OPTIONAL_69","name":"Buddhism"},{"id":75,"code":"NULL","grade":"G9","subjectgroup":"COMP","name":"Geology"},{"id":76,"code":"NULL","grade":"G9","subjectgroup":"COMP","name":"Civics"},{"id":77,"code":"NULL","grade":"G9","subjectgroup":"COMP","name":"Health"},{"id":78,"code":"NULL","grade":"G9","subjectgroup":"OPTIONAL_69","name":"Eastern Music"},{"id":79,"code":"NULL","grade":"G9","subjectgroup":"OPTIONAL_69","name":"Western Music"},{"id":80,"code":"NULL","grade":"G9","subjectgroup":"OPTIONAL_69","name":"Arts"},{"id":81,"code":"NULL","grade":"G9","subjectgroup":"OPTIONAL_69","name":"Dancing"},{"id":82,"code":"NULL","grade":"G9","subjectgroup":"OPTIONAL_69","name":"Drama"},{"id":83,"code":"NULL","grade":"G9","subjectgroup":"OPTIONAL_69","name":"ICT"},{"id":84,"code":"NULL","grade":"G9","subjectgroup":"OPTIONAL_69","name":"PTS"},{"id":85,"code":"NULL","grade":"G10","subjectgroup":"COMP","name":"Maths"},{"id":86,"code":"NULL","grade":"G10","subjectgroup":"COMP","name":"Sinhala"},{"id":87,"code":"NULL","grade":"G10","subjectgroup":"COMP","name":"History"},{"id":88,"code":"NULL","grade":"G10","subjectgroup":"COMP","name":"English"},{"id":89,"code":"NULL","grade":"G10","subjectgroup":"COMP","name":"Science"},{"id":90,"code":"NULL","grade":"G10","subjectgroup":"OL_BUCKET_1","name":"Buddhism"},{"id":91,"code":"NULL","grade":"G10","subjectgroup":"OL_BUCKET_1","name":"Geology"},{"id":92,"code":"NULL","grade":"G10","subjectgroup":"OL_BUCKET_1","name":"Civics"},{"id":93,"code":"NULL","grade":"G10","subjectgroup":"OL_BUCKET_3","name":"Health"},{"id":94,"code":"NULL","grade":"G10","subjectgroup":"OL_BUCKET_3","name":"Media"},{"id":95,"code":"NULL","grade":"G10","subjectgroup":"OL_BUCKET_2","name":"Eastern Music"},{"id":96,"code":"NULL","grade":"G10","subjectgroup":"OL_BUCKET_2","name":"Western Music"},{"id":97,"code":"NULL","grade":"G10","subjectgroup":"OL_BUCKET_2","name":"Arts"},{"id":98,"code":"NULL","grade":"G10","subjectgroup":"OL_BUCKET_2","name":"Dancing"},{"id":99,"code":"NULL","grade":"G10","subjectgroup":"OL_BUCKET_2","name":"Drama"},{"id":100,"code":"NULL","grade":"G10","subjectgroup":"OL_BUCKET_3","name":"ICT"},{"id":101,"code":"NULL","grade":"G10","subjectgroup":"OL_BUCKET_2","name":"English Literature"},{"id":102,"code":"NULL","grade":"G10","subjectgroup":"OL_BUCKET_2","name":"Sinhala Literature"},{"id":103,"code":"NULL","grade":"G11","subjectgroup":"COMP","name":"Maths"},{"id":104,"code":"NULL","grade":"G11","subjectgroup":"COMP","name":"Sinhala"},{"id":105,"code":"NULL","grade":"G11","subjectgroup":"COMP","name":"History"},{"id":106,"code":"NULL","grade":"G11","subjectgroup":"COMP","name":"English"},{"id":107,"code":"NULL","grade":"G11","subjectgroup":"COMP","name":"Science"},{"id":108,"code":"NULL","grade":"G11","subjectgroup":"OL_BUCKET_1","name":"Buddhism"},{"id":109,"code":"NULL","grade":"G11","subjectgroup":"OL_BUCKET_1","name":"Geology"},{"id":110,"code":"NULL","grade":"G11","subjectgroup":"OL_BUCKET_1","name":"Civics"},{"id":111,"code":"NULL","grade":"G11","subjectgroup":"OL_BUCKET_3","name":"Health"},{"id":112,"code":"NULL","grade":"G11","subjectgroup":"OL_BUCKET_3","name":"Media"},{"id":113,"code":"NULL","grade":"G11","subjectgroup":"OL_BUCKET_2","name":"Eastern Music"},{"id":114,"code":"NULL","grade":"G11","subjectgroup":"OL_BUCKET_2","name":"Western Music"},{"id":115,"code":"NULL","grade":"G11","subjectgroup":"OL_BUCKET_2","name":"Arts"},{"id":116,"code":"NULL","grade":"G11","subjectgroup":"OL_BUCKET_2","name":"Dancing"},{"id":117,"code":"NULL","grade":"G11","subjectgroup":"OL_BUCKET_2","name":"Drama"},{"id":118,"code":"NULL","grade":"G11","subjectgroup":"OL_BUCKET_3","name":"ICT"},{"id":119,"code":"NULL","grade":"G11","subjectgroup":"OL_BUCKET_2","name":"English Literature"},{"id":120,"code":"NULL","grade":"G11","subjectgroup":"OL_BUCKET_2","name":"Sinhala Literature"}]'
  // );
  // await prisma.subject.createMany({
  //   data: sub
  // });

  let v = await prisma.user.findMany();
  // console.log(v);
  console.log(JSON.stringify(v));
}
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
