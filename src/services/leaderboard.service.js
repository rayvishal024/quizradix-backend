
// calculate leaderboard 
export function calculateLeaderboard(participants = []) {
     return participants
          .map(p => ({ studentId: p.studentId, score: p.score }))
          .sort((a, b) => b.score - a.score);
}
