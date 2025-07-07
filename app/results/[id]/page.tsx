"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Calendar, TrendingUp, CheckCircle, AlertCircle, Home } from "lucide-react"

const scenarios = [
  { id: 1, title: "Stressed Colleague" },
  { id: 2, title: "Disagreement with Friend" },
  { id: 3, title: "Team Member Taking Credit" },
  { id: 4, title: "Upset Customer" },
  { id: 5, title: "Excluded from Group" },
  { id: 6, title: "Family Dinner Tension" },
  { id: 7, title: "Overwhelmed New Employee" },
  { id: 8, title: "Friend's Relationship Problems" },
  { id: 9, title: "Micromanaging Boss" },
  { id: 10, title: "Child Having Tantrum" },
  { id: 11, title: "Roommate's Messy Habits" },
  { id: 12, title: "Elderly Neighbor Struggling" },
  { id: 13, title: "Group Project Conflict" },
  { id: 14, title: "Social Media Misunderstanding" },
  { id: 15, title: "Workplace Gossip" },
  { id: 16, title: "Friend's Bad Decision" },
  { id: 17, title: "Restaurant Service Issue" },
  { id: 18, title: "Child's Sports Game" },
  { id: 19, title: "Public Transportation Conflict" },
  { id: 20, title: "Workplace Deadline Pressure" },
  { id: 21, title: "Friend's Financial Struggles" },
  { id: 22, title: "Neighbor's Loud Party" },
  { id: 23, title: "Teenage Mood Swings" },
  { id: 24, title: "Workplace Discrimination Witness" },
  { id: 25, title: "Friend's Addiction Concerns" },
  { id: 26, title: "Elderly Parent's Independence" },
  { id: 27, title: "Online Gaming Toxicity" },
  { id: 28, title: "Wedding Planning Stress" },
  { id: 29, title: "Classroom Bullying" },
  { id: 30, title: "Community Volunteer Conflict" },
]

export default function ResultDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [result, setResult] = useState<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const results = JSON.parse(localStorage.getItem("reactly-results") || "[]")
    const foundResult = results.find((r: any) => r.id.toString() === params.id)
    if (foundResult) {
      setResult(foundResult)
    } else {
      router.push("/results")
    }
  }, [params.id, router])

  if (!mounted || !result) return null

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600"
    if (score >= 70) return "text-blue-600"
    if (score >= 55) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBg = (score: number) => {
    if (score >= 85) return "bg-green-500"
    if (score >= 70) return "bg-blue-500"
    if (score >= 55) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getReactionScore = (weight: number) => {
    if (weight >= 8) return { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" }
    if (weight >= 6) return { icon: CheckCircle, color: "text-blue-600", bg: "bg-blue-50" }
    if (weight >= 4) return { icon: AlertCircle, color: "text-yellow-600", bg: "bg-yellow-50" }
    return { icon: AlertCircle, color: "text-red-600", bg: "bg-red-50" }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/results">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Results
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Detailed Analysis</h1>
              <div className="flex items-center text-gray-600 text-sm mt-1">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(result.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
          <Link href="/">
            <Button variant="outline">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </Link>
        </div>

        <Card className="mb-8 animate-zoom-in">
          <CardHeader className="text-center">
            <div
              className={`w-24 h-24 rounded-full ${getScoreBg(result.score)} flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4`}
            >
              {result.score}
            </div>
            <CardTitle className="text-2xl">{result.analysis.level} Performance</CardTitle>
            <CardDescription className="text-lg">{result.analysis.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Your Strengths
                </h3>
                <ul className="space-y-2">
                  {result.analysis.strengths.map((strength: string, index: number) => (
                    <li key={index} className="text-green-700 flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Growth Opportunities
                </h3>
                <ul className="space-y-2">
                  {result.analysis.improvements.map((improvement: string, index: number) => (
                    <li key={index} className="text-blue-700 flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Scenario Breakdown</CardTitle>
            <CardDescription>Review your responses and feedback for each scenario</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {result.responses.map((response: any, index: number) => {
              const scenario = scenarios.find((s) => s.id === response.scenarioId)
              const reactionScore = getReactionScore(response.weight)
              const ReactionIcon = reactionScore.icon

              return (
                <div key={index} className={`p-6 rounded-lg border-l-4 ${reactionScore.bg} border-l-current`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-1">{scenario?.title}</h4>
                      <Badge variant="secondary">Scenario {response.scenarioId}</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ReactionIcon className={`w-5 h-5 ${reactionScore.color}`} />
                      <span className={`font-semibold ${reactionScore.color}`}>{response.weight}/10</span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <Progress value={response.weight * 10} className="h-2" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">{response.feedback}</p>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <div className="text-center mt-8 space-x-4">
          <Link href="/training">
            <Button size="lg">
              <TrendingUp className="w-5 h-5 mr-2" />
              Practice More Scenarios
            </Button>
          </Link>
          <Link href="/results">
            <Button variant="outline" size="lg">
              View All Results
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
