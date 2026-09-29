import { NextResponse } from 'next/server';
import { MOCK_EXAMS } from '@/lib/mockData';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const examId = params.id;
    const body = await request.json();
    const { answers = {}, timeSpentSeconds = 0, tabSwitchViolations = 0 } = body;

    const exam = MOCK_EXAMS.find((e) => e.id === examId) || MOCK_EXAMS[0];

    let correct = 0;
    let wrong = 0;
    let unattempted = 0;

    const subjectStats: Record<string, { total: number; correct: number; score: number }> = {};

    exam.questions.forEach((q) => {
      if (!subjectStats[q.subject]) {
        subjectStats[q.subject] = { total: 0, correct: 0, score: 0 };
      }
      subjectStats[q.subject].total += 1;

      const userChoice = answers[q.id]?.selectedOption;
      if (!userChoice) {
        unattempted += 1;
      } else if (userChoice === q.correctAnswer) {
        correct += 1;
        subjectStats[q.subject].correct += 1;
        subjectStats[q.subject].score += q.marks;
      } else {
        wrong += 1;
        subjectStats[q.subject].score -= q.negativeMarks;
      }
    });

    const totalQuestions = exam.questions.length;
    const attempted = correct + wrong;
    const grossScore = correct * 1.0;
    const penaltyMarks = exam.negativeMarking ? wrong * (exam.negativeMarkRate || 0.25) : 0;
    const finalScore = Math.max(0, grossScore - penaltyMarks);
    const accuracyPercentage = attempted > 0 ? (correct / attempted) * 100 : 0;

    // Projected State-wide rank estimation
    const percentile = Math.min(99.98, Math.max(10, Math.round((finalScore / (totalQuestions || 1)) * 100 * 100) / 100));
    const stateRankEstimate = Math.max(1, Math.round((100 - percentile) * 148));

    const result = {
      attemptId: `att_${Date.now()}`,
      examId,
      totalQuestions,
      attempted,
      correct,
      wrong,
      unattempted,
      grossScore,
      penaltyMarks,
      finalScore: Number(finalScore.toFixed(2)),
      accuracyPercentage: Number(accuracyPercentage.toFixed(1)),
      stateRankEstimate,
      percentile,
      tabSwitchViolations,
      subjectBreakdown: Object.entries(subjectStats).map(([subject, data]) => ({
        subject,
        total: data.total,
        correct: data.correct,
        score: Math.max(0, Number(data.score.toFixed(2))),
      })),
      evaluatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Exam submitted and evaluated successfully under official TSLPRB rules.',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Evaluation Error' },
      { status: 500 }
    );
  }
}
