const { MongoClient } = require("mongodb");
require("dotenv").config();
const xls2json = require("simple-excel-to-json");

const doThings = async () => {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  if (client) {
    const db = client.db("cse");
    const collection = db.collection("student-data");
    const studentData = await collection.find().toArray();
    const _5thSemStudents = studentData.filter(
      (student) => student["CURRENT_SEM"] === 5
    );
    const _6thSemStudents = studentData.filter(
      (student) => student["CURRENT_SEM"] === 7
    );
    /**
     * Promote the students
     * */
    // for (let [index, student] of _4thSemStudents.entries()) {
    //   await collection.updateOne(
    //     { REGNO: student["REGNO"] },
    //     { $set: { CURRENT_SEM: 5 } }
    //   );
    //   console.log(`${index + 1} of ${_4thSemStudents.length} done`);
    // }
    // for (let [index, student] of _6thSemStudents.entries()) {
    //   await collection.updateOne(
    //     { REGNO: student["REGNO"] },
    //     { $set: { CURRENT_SEM: 7 } }
    //   );
    //   console.log(`${index + 1} of ${_6thSemStudents.length} done`);
    // }
    // const _4thElectiveOne = xls2json.parseXls2Json(
    //   "./resources/_4thElectiveOne.xlsx"
    // )[0];
    // //Update elective one and two for _5thStudents
    // for (const [index, student] of _5thSemStudents.entries()) {
    //   const studentData = _4thElectiveOne.find((s) => {
    //     return s.REGNO === student.REGNO;
    //   });
    //   if (studentData) {
    //     await collection.updateOne(
    //       { REGNO: studentData.REGNO },
    //       {
    //         $set: {
    //           ELECTIVE_1: {
    //             CODE: studentData.CODE,
    //             TITLE: studentData.SUBJECT,
    //           },
    //         },
    //       }
    //     );
    //   }
    //   console.log(`${index + 1} of ${_5thSemStudents.length} done`);
    // }
    // const subjects = {
    //   "CS1439/CS1407": "Communication Techniques",
    //   CS1436: "Fundamentals of Web Technology",
    //   "CS1437/CS1422": "Enterprise Resource Planning",
    //   CS1434: "Java Programming",
    //   "CS1440/CS1425": "Internet, Technology and Society",
    //   CS1435: "Python Programming",
    //   CS: "CS",
    //   "CS1438/CS1431": "Microprocessors and Peripheral Devices",
    //   AI: "AI",
    //   CS1442: "User Interface/User Experience (UI/UX) Design",
    //   DS: "DS",
    // };

    // for (const [index, student] of _5thSemStudents.entries()) {
    //   let elective_3_options = [
    //     { CODE: "CS1545", TITLE: "Artificial Neural Networks" },
    //     { CODE: "CS1544", TITLE: "Information Retrieval" },
    //     { CODE: "CS1759/CS1644", TITLE: "Artificial Intelligence" },
    //     { CODE: "CS1752", TITLE: "Advanced Algorithms" },
    //   ];
    //   if (student["MINOR_SPECIALIZATION"]) {
    //     if (student["MINOR_SPECIALIZATION"] === "AI") {
    //       elective_3_options = elective_3_options.filter(
    //         (subject) =>
    //           subject.CODE !== "CS1759/CS1644" && subject.CODE !== "CS1545"
    //       );
    //     } else if (student["MINOR_SPECIALIZATION"] === "DS") {
    //       elective_3_options = elective_3_options.filter(
    //         (subject) => subject.CODE !== "CS1759/CS1644"
    //       );
    //     }
    //   }
    //   await collection.updateOne(
    //     { REGNO: student.REGNO },
    //     {
    //       $set: {
    //         ELECTIVE_3_OPTIONS: elective_3_options,
    //       },
    //     }
    //   );
    //   console.log(`${index + 1} of ${_5thSemStudents.length} done`);
    // }
    for (const [index, student] of _5thSemStudents.entries()) {
      let elective_4_options = [
        { CODE: "CS1545/CS1404", TITLE: "Computer Graphics" },
        { CODE: "CS1541/CS1633", TITLE: "Digital Image Processing" },
        { CODE: "CS1537", TITLE: "Advanced Web Technologies" },
        {
          CODE: "CS1538/CS1601",
          TITLE: "Object Oriented Analysis and Design using UML",
        },
      ];
      if (student["MINOR_SPECIALIZATION"]) {
        if (student["MINOR_SPECIALIZATION"] === "AI") {
          elective_4_options = elective_4_options.filter(
            (subject) => subject.CODE !== "CS1541/CS1633"
          );
        }
      }
      await collection.updateOne(
        { REGNO: student.REGNO },
        {
          $set: {
            ELECTIVE_4_OPTIONS: elective_4_options,
          },
        }
      );
      console.log(`${index + 1} of ${_5thSemStudents.length} done`);
    }
  }
};
doThings();
