"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Plus, Users, DollarSign } from "lucide-react";
import Link from "next/link";

// Mock data for groups
const mockGroups = [
  {
    id: 1,
    name: "Weekend Trip",
    member_count: 4,
    total_expenses: 245.8,
    your_balance: -15.25,
    members: [
      { name: "Alice", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Bob", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Carol", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: 2,
    name: "Roommates",
    member_count: 3,
    total_expenses: 156.4,
    your_balance: 8.75,
    members: [
      { name: "David", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Emma", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: 3,
    name: "Office Lunch",
    member_count: 6,
    total_expenses: 89.6,
    your_balance: -12.5,
    members: [
      { name: "Frank", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Grace", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Henry", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
];

export default function GroupsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Groups</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Create Group Button */}
        <Link href="/groups/create-group">
          <Button className="w-full h-12 flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Group
          </Button>
        </Link>

        {/* Groups List */}
        <div className="space-y-4">
          {mockGroups.map((group) => (
            <Link key={group.id} href={`/groups/${group.id}`}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{group.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <Users className="h-4 w-4" />
                        <span>{group.member_count} members</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-semibold ${
                          group.your_balance < 0
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {group.your_balance < 0 ? "You owe" : "You are owed"}
                      </div>
                      <div
                        className={`text-lg font-bold ${
                          group.your_balance < 0
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        ${Math.abs(group.your_balance).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {group.members.slice(0, 3).map((member, index) => (
                        <Avatar
                          key={index}
                          className="h-8 w-8 border-2 border-white"
                        >
                          <AvatarImage
                            src={member.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback className="text-xs">
                            {member.name[0]}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {group.member_count > 3 && (
                        <div className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                          <span className="text-xs font-medium">
                            +{group.member_count - 3}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <DollarSign className="h-4 w-4" />
                      <span>${group.total_expenses.toFixed(2)} total</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
