import QuizPicks from "./QuizPick"

export default {
    calcPickRates(picks: number[], total: any) {
      const quizPicks = new QuizPicks(picks)
      return quizPicks.calcPickRates(total)
    },
  
    calcPickKills(picks: number[], total: any) {
      const quizPicks = new QuizPicks(picks)
      return quizPicks.calcPickKills(total)
    },
  }