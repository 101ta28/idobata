import { useEffect, useState } from "react";
import TopPageTemplate from "../components/top/TopPageTemplate";
import { useMock } from "../contexts/MockContext";
import { apiClient } from "../services/api/apiClient";
import type { Question, Theme } from "../types";

const Top = () => {
  const { isMockMode } = useMock();
  const [topPageData, setTopPageData] = useState<{
    latestThemes: Theme[];
    latestQuestions: Question[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(!isMockMode);
  const [error, setError] = useState<string | null>(null);

  const mockDiscussionData = [
    {
      id: 1,
      title: "どうすれば若者が安心してキャリアを築ける社会を実現できるか？",
      problemCount: 99,
      solutionCount: 99,
      likeCount: 99,
    },
    {
      id: 2,
      title: "どうすれば若者が安心してキャリアを築ける社会を実現できるか？",
      problemCount: 99,
      solutionCount: 99,
      likeCount: 99,
    },
    {
      id: 3,
      title: "どうすれば若者が安心してキャリアを築ける社会を実現できるか？",
      problemCount: 99,
      solutionCount: 99,
      likeCount: 99,
    },
  ];

  const mockThemeData = [
    {
      id: "1",
      title: "どうすれば若者が安心してキャリアを築ける社会を実現できるか？",
      description:
        "どうすれば若者が安心してキャリアを築ける社会を実現できるか？",
      keyQuestionCount: 99,
      commentCount: 99,
    },
    {
      id: "2",
      title: "どうすれば若者が安心してキャリアを築ける社会を実現できるか？",
      description:
        "どうすれば若者が安心してキャリアを築ける社会を実現できるか？",
      keyQuestionCount: 99,
      commentCount: 99,
    },
    {
      id: "3",
      title: "どうすれば若者が安心してキャリアを築ける社会を実現できるか？",
      description:
        "どうすれば若者が安心してキャリアを築ける社会を実現できるか？",
      keyQuestionCount: 99,
      commentCount: 99,
    },
  ];

  useEffect(() => {
    if (isMockMode) return;

    const fetchTopPageData = async () => {
      setIsLoading(true);
      setError(null);

      const result = await apiClient.getTopPageData();

      if (!result.isOk()) {
        setError(`データの取得に失敗しました: ${result.error.message}`);
        console.error("Error fetching top page data:", result.error);
        setIsLoading(false);
        return;
      }

      setTopPageData(result.value);
      setIsLoading(false);
    };

    fetchTopPageData();
  }, [isMockMode]);

  if (!isMockMode && isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 xl:max-w-none">
        <div className="text-center py-8">
          <p>データを読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!isMockMode && error) {
    return (
      <div className="container mx-auto px-4 py-8 xl:max-w-none">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (isMockMode || topPageData) {
    const templateProps = isMockMode
      ? {
          discussions: mockDiscussionData,
          themes: mockThemeData,
        }
      : {
          discussions:
            topPageData?.latestQuestions.map((q) => ({
              id: q._id,
              title: q.tagLine
                ? `${q.tagLine}：${q.questionText}`
                : q.questionText,
              problemCount: q.issueCount || 0,
              solutionCount: q.solutionCount || 0,
              likeCount: q.likeCount || 0,
            })) || [],
          themes:
            topPageData?.latestThemes.map((t) => ({
              id: t._id,
              title: t.title,
              description: t.description,
              keyQuestionCount: t.keyQuestionCount || 0,
              commentCount: t.commentCount || 0,
            })) || [],
        };

    return <TopPageTemplate {...templateProps} />;
  }

  return (
    <div className="container mx-auto px-4 py-8 xl:max-w-none">
      <div className="text-center py-8">
        <p>データを表示できません。</p>
      </div>
    </div>
  );
};

export default Top;
