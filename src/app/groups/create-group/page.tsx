"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Users, Plus, Search } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock data for available members/friends
const mockMembers = [
  { id: 1, name: "You", email: "you@email.com", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 2, name: "Alice Johnson", email: "alice@email.com", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 3, name: "Bob Smith", email: "bob@email.com", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 4, name: "Carol Davis", email: "carol@email.com", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 5, name: "David Wilson", email: "david@email.com", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 6, name: "Emma Brown", email: "emma@email.com", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 7, name: "Frank Miller", email: "frank@email.com", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 8, name: "Grace Lee", email: "grace@email.com", avatar: "/placeholder.svg?height=40&width=40" },
]

export default function CreateGroupPage() {
  const router = useRouter()
  const [groupName, setGroupName] = useState("")
  const [selectedMembers, setSelectedMembers] = useState<number[]>([1]) // You are always included
  const [searchQuery, setSearchQuery] = useState("")

  const handleMemberToggle = (memberId: number) => {
    if (memberId === 1) return // Can't unselect yourself

    setSelectedMembers((prev) => (prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]))
  }

  const handleSelectAll = () => {
    if (selectedMembers.length === mockMembers.length) {
      setSelectedMembers([1]) // Keep only yourself
    } else {
      setSelectedMembers(mockMembers.map((m) => m.id))
    }
  }

  const filteredMembers = mockMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Here you would typically make an API call to create the group
    console.log({
      name: groupName,
      member_ids: selectedMembers,
    })

    // Redirect to groups page or the newly created group
    router.push("/groups")
  }

  const isFormValid = groupName.trim() !== "" && selectedMembers.length >= 2

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4">
        <div className="flex items-center gap-4">
          <Link href="/groups">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Create New Group</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Group Name */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              Group Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="group-name">Group Name</Label>
              <Input
                id="group-name"
                type="text"
                placeholder="e.g., Weekend Trip, Roommates, Office Lunch"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="h-12"
                required
              />
              <p className="text-sm text-gray-500">Give your group a descriptive name</p>
            </div>
          </CardContent>
        </Card>

        {/* Member Selection */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Add Members</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={handleSelectAll}>
                {selectedMembers.length === mockMembers.length ? "Deselect All" : "Select All"}
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {selectedMembers.length} member{selectedMembers.length !== 1 ? "s" : ""} selected
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Members List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredMembers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No members found</p>
                </div>
              ) : (
                filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-colors ${
                      selectedMembers.includes(member.id)
                        ? "bg-blue-50 border-blue-200"
                        : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Checkbox
                      id={`member-${member.id}`}
                      checked={selectedMembers.includes(member.id)}
                      onCheckedChange={() => handleMemberToggle(member.id)}
                      disabled={member.id === 1} // Can't unselect yourself
                    />
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Label htmlFor={`member-${member.id}`} className="cursor-pointer font-medium">
                        {member.name}
                        {member.id === 1 && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">You</span>
                        )}
                      </Label>
                      <p className="text-sm text-gray-600">{member.email}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add New Member Button */}
            <Button type="button" variant="outline" className="w-full bg-transparent" disabled>
              <Plus className="h-4 w-4 mr-2" />
              Invite New Member
            </Button>
          </CardContent>
        </Card>

        {/* Validation Message */}
        {!isFormValid && groupName.trim() !== "" && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">Please select at least 2 members (including yourself)</p>
          </div>
        )}

        {/* Summary Card */}
        {isFormValid && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-blue-900">Group Name:</span>
                  <span className="text-blue-900">{groupName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-blue-900">Total Members:</span>
                  <span className="text-blue-900">{selectedMembers.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submit Button */}
        <Button type="submit" className="w-full h-12 text-lg" disabled={!isFormValid}>
          <Users className="h-5 w-5 mr-2" />
          Create Group
        </Button>
      </form>
    </div>
  )
}
