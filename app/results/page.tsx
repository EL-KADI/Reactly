"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, TrendingUp, BarChart3, Home, Trash2 } from "lucide-react"

export default function ResultsPage() {
  const [results, setResults] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedResults = JSON.parse(localStorage.getItem("reactly-results") || "[]")
    setResults(savedResults.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()))
  }, [])

  const deleteResult = (id: number) => {
    const updatedResults = results.filter((result) => result.id !== id)
    setResults(updatedResults)
    localStorage.setItem("reactly-results", JSON.stringify(updatedResults))
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return "bg-green-500"
    if (score >= 70) return "bg-blue-500"
    if (score >= 55) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getScoreLevel = (score: number) => {
    if (score >= 85) return "Excellent"
    if (score >= 70) return "Good"
    if (score >= 55) return "Developing"
    return "Needs Development"
  }

  if (!mounted) return null

  if (results.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center animate-fade-in">
          <CardHeader>
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <CardTitle>No Results Yet</CardTitle>
            <CardDescription>Complete your first EQ training session to see your results here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/training">
              <Button className="w-full">Start Training</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full bg-transparent">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const averageScore = Math.round(results.reduce((sum, result) => sum + result.score, 0) / results.length)
  const totalScenarios = 30

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your EQ Results</h1>
            <p className="text-gray-600">Track your emotional intelligence progress over time</p>
          </div>
          <Link href="/">
            <Button variant="outline">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="animate-slide-in-left">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-blue-600">{results.length}</CardTitle>
              <CardDescription>Sessions Completed</CardDescription>
            </CardHeader>
          </Card>
          <Card className="animate-slide-in-up">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-green-600">{totalScenarios}</CardTitle>
              <CardDescription>Scenarios Per Session</CardDescription>
            </CardHeader>
          </Card>
          <Card className="animate-slide-in-right">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-purple-600">{averageScore}</CardTitle>
              <CardDescription>Average Score</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="space-y-4">
          {results.map((result, index) => (
            <Card key={result.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <div
                        className={`w-16 h-16 rounded-full ${getScoreColor(result.score)} flex items-center justify-center text-white font-bold text-xl`}
                      >
                        {result.score}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{getScoreLevel(result.score)} Performance</CardTitle>
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
                    <Badge variant="secondary" className="mb-2">
                      {result.scenariosCompleted} scenarios completed
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Link href={`/results/${result.id}`}>
                      <Button variant="outline" size="sm">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteResult(result.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Strengths</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {result.analysis.strengths.map((strength: string, i: number) => (
                        <li key={i}>• {strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">Areas for Improvement</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {result.analysis.improvements.map((improvement: string, i: number) => (
                        <li key={i}>• {improvement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/training">
            <Button size="lg">
              <TrendingUp className="w-5 h-5 mr-2" />
              Take Another Assessment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
