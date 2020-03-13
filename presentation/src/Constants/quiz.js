export const response = {
  // TODO: get from backend
  quizId: "quiz1",
  numQs: 9, // length(questions)-1
  author: "recruiterId1",
  title: "Test Quiz",
  questions: [
    {
      questionId: "q0",
      questionType: 0, // 0 MC, 1 long answer TODO: string
      question:
        "A man sued a railroad for personal injuries suffered when his car was struck by a train at an unguarded crossing. A major issue is whether the train sounded its whistle before arriving at the crossing. The railroad has offered the testimony of a resident who has lived near the crossing for 15 years. Although she was not present on the occasion in question, she will testify that, whenever she is home, the train always sounds its whistle before arriving at the crossing. Is the resident’s testimony admissible?",
      answers: [
        "No, due to the resident’s lack of personal knowledge regarding the incident in question.",
        "No, because habit evidence is limited to the conduct of persons, not businesses.",
        "Yes, as evidence of a routine practice. ",
        "Yes, as a summary of her present sense impressions."
      ],
      correct: 1
    },

    {
      questionId: "q1",
      questionType: "0",
      question: "Who is Steve Jobs?",
      answers: [
        "CEO of Microsoft",
        "Barber in NY",
        "Movie Star",
        "CEO of Apple"
      ],
      correct: 3
    },

    {
      questionId: "q2",
      questionType: "0",
      question: "Metallica is a ____ band",
      answers: ["Blues", "Hard-Rock", "Jazz", "Metal"],
      correct: 3
    },

    {
      questionId: "q3",
      questionType: "0",
      question: "IS is a ____",
      answers: ["Word", "Band", "Terror Group", "Brand"],
      correct: 2
    },

    {
      questionId: "q4",
      questionType: "0",
      question: "Who was Einstein",
      answers: [
        "A Scientist",
        "A Dentist",
        "A Serial Killer",
        "None of the above"
      ],
      correct: 0
    },

    {
      questionId: "q5",
      questionType: "0",
      question: "JavaScript can be used in ____ development",
      answers: ["Back-End", "Front-End", "ReactJS", "All of the Above"],
      correct: 3
    },

    {
      questionId: "q6",
      questionType: "0",
      question: "Hitler was a",
      answers: [
        "Mass Murderer",
        "Dictator",
        "Jew",
        "None of the above",
        "All of the above"
      ],
      correct: 4
    },

    {
      questionId: "q7",
      questionType: "0",
      question: "Korn is a",
      answers: ["Nu-Metal band", "Religion", "Singer"],
      correct: 0
    },

    {
      questionId: "q8",
      questionType: "0",
      question: "Windows computers are",
      answers: ["Horrible", "Great", "Cheap", "Invented by Bill Gates"],
      correct: 3
    },

    {
      questionId: "q9",
      questionType: "0",
      question: "The BigBan stands in",
      answers: ["Egypt", "London", "Amsterdam", "NewYork"],
      correct: 1
    }

    /*
                  {
                      questionId: "q10",
                      questionType: "1",
                      question: "Who made this quiz"
                  },

                  {
                      questionId: "q11",
                      questionType: "1",
                      question: "What is the group name of this project"
                  },

                  {
                      questionId: "q12",
                      questionType: "1",
                      question: "What did I have for dinner"
                  }
                  */
  ] // end questions
}; // end response
