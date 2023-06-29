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
    const _7thSemStudents = studentData.filter(
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
    // for (const [index, student] of _5thSemStudents.entries()) {
    //   let elective_4_options = [
    //     { CODE: "CS1545/CS1404", TITLE: "Computer Graphics" },
    //     { CODE: "CS1541/CS1633", TITLE: "Digital Image Processing" },
    //     { CODE: "CS1537", TITLE: "Advanced Web Technologies" },
    //     {
    //       CODE: "CS1538/CS1601",
    //       TITLE: "Object Oriented Analysis and Design using UML",
    //     },
    //   ];
    //   if (student["MINOR_SPECIALIZATION"]) {
    //     if (student["MINOR_SPECIALIZATION"] === "AI") {
    //       elective_4_options = elective_4_options.filter(
    //         (subject) => subject.CODE !== "CS1541/CS1633"
    //       );
    //     }
    //   }
    //   await collection.updateOne(
    //     { REGNO: student.REGNO },
    //     {
    //       $set: {
    //         ELECTIVE_4_OPTIONS: elective_4_options,
    //       },
    //     }
    //   );
    //   console.log(`${index + 1} of ${_5thSemStudents.length} done`);
    // }
    // const _7thData = xls2json.parseXls2Json("./resources/_7thList.xlsx")[0];
    // for (let [index, student] of _7thData.entries()) {
    //   const studentData = _7thSemStudents.find(
    //     (s) => s.REGNO === student.REGNO
    //   );
    //   if (
    //     studentData &&
    //     student["Minor_Specialization"] &&
    //     student["Minor_3_Code"] &&
    //     student["Minor_4_Code"]
    //   ) {
    //     console.log(student.REGNO, student["Minor_Specialization"]);
    //     await collection.updateOne(
    //       { REGNO: student["REGNO"] },
    //       {
    //         $set: {
    //           MINOR_3: {
    //             CODE: student["Minor_3_Code"],
    //             TITLE: student["Minor_3_Title"],
    //           },
    //           MINOR_4: {
    //             CODE: student["Minor_4_Code"],
    //             TITLE: student["Minor_2_Title"],
    //           },
    //         },
    //       }
    //     );
    //   }
    // }
    for (const [index, student] of _7thSemStudents.entries()) {
      const previousSubjects = [];
      student["ELECTIVE_1"] &&
        previousSubjects.push(`${student["ELECTIVE_1"]["CODE"]}`);
      student["ELECTIVE_2"] &&
        previousSubjects.push(`${student["ELECTIVE_2"]["CODE"]}`);
      student["ELECTIVE_4"] &&
        previousSubjects.push(`${student["ELECTIVE_4"]["CODE"]}`);
      student["ELECTIVE_5"] &&
        previousSubjects.push(`${student["ELECTIVE_5"]["CODE"]}`);
      let elective_8_options = [
        { CODE: "CS1756", TITLE: "R PROGRAMMING" },
        { CODE: "CS1731", TITLE: "ADHOC WIRELESS NETWORKS" },
        { CODE: "CS1641", TITLE: "SOCIAL NETWORK ANALYSIS" },
        { CODE: "CS1743", TITLE: "CYBER SECURITY" },
        { CODE: "CS1640/CS1758", TITLE: "COMPUTER VISION" },
      ];
      elective_8_options = elective_8_options.filter(
        (subject) => !previousSubjects.includes(subject.CODE)
      );
      if (student["MINOR_SPECIALIZATION"]) {
        if (student["MINOR_SPECIALIZATION"] === "CS") {
          elective_8_options = elective_8_options.filter(
            (subject) => subject.CODE !== "CS1743"
          );
        }
      }
      await collection.updateOne(
        { REGNO: student.REGNO },
        {
          $set: {
            ELECTIVE_8_OPTIONS: elective_8_options,
          },
        }
      );
      console.log(`${index + 1} of ${_7thSemStudents.length} done`);
    }
  }
};
doThings();
