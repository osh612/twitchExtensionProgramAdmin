import { stompPublish } from "./socket/webSocket"

const startData ={
    uniqueId: "LCK/2022 Season/Spring Playoffs_Finals_1",
    setNum: 1,
    quizGroupIdx: 1,
    quizIdx: 1,
    quizName: "test",
    order: 1,
    time: 60,
    item: [
        {
            idx:1,
            name:"유형1",
            counts:1,
            kills:1,
            width:1,
            confirm:1,
          },
          {
            idx:2,
            name:"유형2",
            counts:2,
            kills:2,
            width:2,
            confirm:2,
        }
    ],
}

const shutDownData = { 
    quizIdx: 1,
    order: 1,
}
const stopData = {
    quizIdx: 1,
    pcik: 300,
    order: 1,
    item: [
        {
            idx:1,
            name:"유형1",
            counts:1,
            kills:1,
            width:1,
            confirm:1,
        },
        {
            idx:2,
            name:"유형2",
            counts:2,
            kills:2,
            width:2,
            confirm:2,
        }
    ],
}
const settleData = {
    quizGroupIdx: 1,
    setNum: 1,
}

const correctData = {
    userId: "313242312",
    channelId: "1231241",
    quizGroupIdx: 1,
    quizIdx: 1,
    order: "1",
    item: {
        idx:1,
        name:"유형1",
        counts:1,
        kills:2,
        width:1,
        confirm:1,
    }
}

class QuizProcessServices {
     quizStart = () => {
        stompPublish('/send/extension/quiz/start', startData)
      }
       quizShutDown = () => {
        stompPublish('/send/extension/quiz/shutdown', shutDownData)
      }
       quizStop = () => {
        stompPublish('/send/extension/quiz/finish', stopData)
      }
       quizSettle = () => {
        stompPublish('/send/extension/quiz/settle', settleData)
      }
       quizCorrect = () => {
        stompPublish('/send/extension/quiz/correct', correctData)
      }
}
export default new QuizProcessServices();