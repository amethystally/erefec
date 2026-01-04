"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2, User, TrendingUp, ImageIcon, Shield, Users, MessageSquare, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const API_KEY = "2J4kDZiyHNhyQ9Ol"
const BASE_URL = "https://api.omar-thing.site/"

export default function TikTokAPITool() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchAPI = async (endpoint: string) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch(endpoint)
      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError("Failed to fetch data. Please check your input and try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleUserProfile = async (username: string) => {
    if (!username.trim()) {
      setError("Please enter a username")
      return
    }
    await fetchAPI(`${BASE_URL}?key=${API_KEY}&username=${username}`)
  }

  const handleFullProfile = async (username: string) => {
    if (!username.trim()) {
      setError("Please enter a username")
      return
    }
    await fetchAPI(`${BASE_URL}?key=${API_KEY}&username=${username}&type=full`)
  }

  const handleStories = async (username: string) => {
    if (!username.trim()) {
      setError("Please enter a username")
      return
    }
    await fetchAPI(`${BASE_URL}?key=${API_KEY}&username=${username}&type=stories`)
  }

  const handleDomainInfo = async (username: string) => {
    if (!username.trim()) {
      setError("Please enter a username")
      return
    }
    await fetchAPI(`${BASE_URL}?key=${API_KEY}&type=domain&username=${username}`)
  }

  const handleFollowingList = async (username: string, limit: string) => {
    if (!username.trim()) {
      setError("Please enter a username")
      return
    }
    await fetchAPI(`${BASE_URL}?key=${API_KEY}&username=${username}&type=following&limit=${limit || "100"}`)
  }

  const handleComments = async (videoUrl: string, filterUsername: string) => {
    if (!videoUrl.trim()) {
      setError("Please enter a video URL")
      return
    }
    const url = filterUsername.trim()
      ? `${BASE_URL}?key=${API_KEY}&type=comments&video_url=${encodeURIComponent(videoUrl)}&username=${filterUsername}`
      : `${BASE_URL}?key=${API_KEY}&type=comments&video_url=${encodeURIComponent(videoUrl)}`
    await fetchAPI(url)
  }

  const handleAccountInfo = async (username: string) => {
    if (!username.trim()) {
      setError("Please enter a username")
      return
    }
    await fetchAPI(`${BASE_URL}?key=${API_KEY}&type=account_info&username=${username}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            
            <h1 className="text-3xl font-bold tracking-tight text-balance">TikTok API </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl text-pretty">
            {""}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 gap-2 h-auto p-1">
            <TabsTrigger value="profile" className="flex flex-col gap-1 py-3">
              <User className="size-4" />
              <span className="text-xs">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex flex-col gap-1 py-3">
              <TrendingUp className="size-4" />
              <span className="text-xs">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="stories" className="flex flex-col gap-1 py-3">
              <ImageIcon className="size-4" />
              <span className="text-xs">Stories</span>
            </TabsTrigger>
            <TabsTrigger value="domain" className="flex flex-col gap-1 py-3">
              <Info className="size-4" />
              <span className="text-xs">Domain</span>
            </TabsTrigger>
            <TabsTrigger value="following" className="flex flex-col gap-1 py-3">
              <Users className="size-4" />
              <span className="text-xs">Following</span>
            </TabsTrigger>
            <TabsTrigger value="comments" className="flex flex-col gap-1 py-3">
              <MessageSquare className="size-4" />
              <span className="text-xs">Comments</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex flex-col gap-1 py-3">
              <Shield className="size-4" />
              <span className="text-xs">Security</span>
            </TabsTrigger>
          </TabsList>

          {/* User Profile */}
          <TabsContent value="profile">
            <ProfileForm onSubmit={handleUserProfile} loading={loading} />
          </TabsContent>

          {/* Full Analytics */}
          <TabsContent value="analytics">
            <AnalyticsForm onSubmit={handleFullProfile} loading={loading} />
          </TabsContent>

          {/* Stories */}
          <TabsContent value="stories">
            <StoriesForm onSubmit={handleStories} loading={loading} />
          </TabsContent>

          {/* Domain Info */}
          <TabsContent value="domain">
            <DomainForm onSubmit={handleDomainInfo} loading={loading} />
          </TabsContent>

          {/* Following List */}
          <TabsContent value="following">
            <FollowingForm onSubmit={handleFollowingList} loading={loading} />
          </TabsContent>

          {/* Comments */}
          <TabsContent value="comments">
            <CommentsForm onSubmit={handleComments} loading={loading} />
          </TabsContent>

          {/* Account Security */}
          <TabsContent value="security">
            <SecurityForm onSubmit={handleAccountInfo} loading={loading} />
          </TabsContent>
        </Tabs>

        {/* Results Section */}
        {error && (
          <Alert variant="destructive" className="mt-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>API Response</CardTitle>
              <CardDescription>Real-time data from TikTok API</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[600px] text-sm">
                {JSON.stringify(result, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <p className="text-sm text-muted-foreground text-center">
            TikTok API Toolkit • Professional data extraction and analytics
          </p>
        </div>
      </footer>
    </div>
  )
}

function ProfileForm({ onSubmit, loading }: { onSubmit: (username: string) => void; loading: boolean }) {
  const [username, setUsername] = useState("")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="size-5" />
          User Profile
        </CardTitle>
        <CardDescription>
          Get detailed profile information for any TikTok user with sub-second response time.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">TikTok Username</Label>
          <Input
            id="username"
            placeholder="e.g., tiktokcopy"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSubmit(username)}
          />
        </div>
        <Button onClick={() => onSubmit(username)} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" /> Fetching...
            </>
          ) : (
            "Get Profile"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

function AnalyticsForm({ onSubmit, loading }: { onSubmit: (username: string) => void; loading: boolean }) {
  const [username, setUsername] = useState("")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="size-5" />
          Full Profile Analysis
        </CardTitle>
        <CardDescription>
          Comprehensive analytics including engagement rate, posting schedule, shadow ban check, and viral potential.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="analytics-username">TikTok Username</Label>
          <Input
            id="analytics-username"
            placeholder="e.g., tiktok"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSubmit(username)}
          />
        </div>
        <Button onClick={() => onSubmit(username)} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" /> Analyzing...
            </>
          ) : (
            "Get Full Analytics"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

function StoriesForm({ onSubmit, loading }: { onSubmit: (username: string) => void; loading: boolean }) {
  const [username, setUsername] = useState("")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="size-5" />
          Active Stories
        </CardTitle>
        <CardDescription>
          Get active stories with direct media URLs, view count, like count, and expiry time. 
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="stories-username">TikTok Username</Label>
          <Input
            id="stories-username"
            placeholder="e.g., user123"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSubmit(username)}
          />
        </div>
        <Button onClick={() => onSubmit(username)} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" /> Loading...
            </>
          ) : (
            "Get Stories"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

function DomainForm({ onSubmit, loading }: { onSubmit: (username: string) => void; loading: boolean }) {
  const [username, setUsername] = useState("")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="size-5" />
          Domain & Phone Info
        </CardTitle>
        <CardDescription>
          Get email domain and phone country code for quick lookup.  
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="domain-username">TikTok Username</Label>
          <Input
            id="domain-username"
            placeholder="e.g., girlandgallery"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSubmit(username)}
          />
        </div>
        <Button onClick={() => onSubmit(username)} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" /> Fetching...
            </>
          ) : (
            "Get Domain Info"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

function FollowingForm({
  onSubmit,
  loading,
}: { onSubmit: (username: string, limit: string) => void; loading: boolean }) {
  const [username, setUsername] = useState("")
  const [limit, setLimit] = useState("100")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="size-5" />
          Following List
        </CardTitle>
        <CardDescription>
          Export following list with username, ID, follower count, and verified status.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="following-username">TikTok Username</Label>
          <Input
            id="following-username"
            placeholder="e.g., tiktok"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="limit">Limit (use "full" for all)</Label>
          <Input id="limit" placeholder="100" value={limit} onChange={(e) => setLimit(e.target.value)} />
        </div>
        <Button onClick={() => onSubmit(username, limit)} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" /> Fetching...
            </>
          ) : (
            "Get Following List"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

function CommentsForm({
  onSubmit,
  loading,
}: { onSubmit: (videoUrl: string, username: string) => void; loading: boolean }) {
  const [videoUrl, setVideoUrl] = useState("")
  const [filterUsername, setFilterUsername] = useState("")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="size-5" />
          Video Comments
        </CardTitle>
        <CardDescription>
          Fetch all comments with optional filtering by specific user.  
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="video-url">Video URL</Label>
          <Input
            id="video-url"
            placeholder="e.g., https://vt.tiktok.com/ZSyjwpsm5/"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="filter-username">Filter by Username (optional)</Label>
          <Input
            id="filter-username"
            placeholder="e.g., khaby.lame"
            value={filterUsername}
            onChange={(e) => setFilterUsername(e.target.value)}
          />
        </div>
        <Button onClick={() => onSubmit(videoUrl, filterUsername)} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" /> Fetching...
            </>
          ) : (
            "Get Comments"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

function SecurityForm({ onSubmit, loading }: { onSubmit: (username: string) => void; loading: boolean }) {
  const [username, setUsername] = useState("")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="size-5" />
          Account Security Info
        </CardTitle>
        <CardDescription>
          Check linked platforms, email/mobile verification status. May take up to 20s. 
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="security-username">TikTok Username</Label>
          <Input
            id="security-username"
            placeholder="e.g., tiktok"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSubmit(username)}
          />
        </div>
        <Button onClick={() => onSubmit(username)} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" /> Checking...
            </>
          ) : (
            "Get Security Info"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
