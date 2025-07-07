"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Users, TrendingUp, Star } from "lucide-react"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [stats, setStats] = useState({ totalScenarios: 0, averageScore: 0, completedSessions: 0 })

  useEffect(() => {
    setMounted(true)
    const results = JSON.parse(localStorage.getItem("reactly-results") || "[]")
    if (results.length > 0) {
      const totalScore = results.reduce((sum: number, result: any) => sum + result.score, 0)
      const totalScenarios = results.reduce((sum: number, result: any) => sum + result.scenariosCompleted, 0)
      setStats({
        totalScenarios,
        averageScore: Math.round(totalScore / results.length),
        completedSessions: results.length,
      })
    }
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Reactly</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enhance your emotional intelligence through interactive, story-based social scenarios
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="animate-slide-in-left">
            <CardHeader className="text-center">
              <Brain className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <CardTitle>Smart Training</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Realistic scenarios designed to challenge and improve your emotional responses
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="animate-slide-in-up">
            <CardHeader className="text-center">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <CardTitle>Immediate Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Get instant insights on your choices and learn better ways to respond
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="animate-slide-in-right">
            <CardHeader className="text-center">
              <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-2" />
              <CardTitle>Track Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Monitor your EQ development with detailed analytics and personalized insights
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {stats.completedSessions > 0 && (
          <div className="grid md:grid-cols-3 gap-4 mb-8 animate-zoom-in">
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-blue-600">{stats.completedSessions}</div>
              <div className="text-gray-600">Sessions Completed</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-green-600">{stats.totalScenarios}</div>
              <div className="text-gray-600">Scenarios Practiced</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-purple-600">{stats.averageScore}</div>
              <div className="text-gray-600">Average EQ Score</div>
            </div>
          </div>
        )}

        <div className="text-center animate-fade-in-delayed">
          <Link href="/training">
            <Button size="lg" className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700">
              <Star className="w-5 h-5 mr-2" />
              Start EQ Training
            </Button>
          </Link>
          {stats.completedSessions > 0 && (
            <Link href="/results" className="ml-4">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-transparent">
                View Past Results
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
