"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Receipt, Users, Calendar } from "lucide-react";
import Link from "next/link";
import { use } from "react";

// Mock data for group details
const mockGroupData = {
  id: 1,
  name: "Weekend Trip",
  members: [
    {
      id: 1,
      name: "You",
      balance: -15.25,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Alice Johnson",
      balance: 8.5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Bob Smith",
      balance: 12.75,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Carol Davis",
      balance: -6.0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
  expenses: [
    {
      id: 1,
      bill_type: "Restaurant",
      amount: 120.0,
      paid_by: "Alice Johnson",
      date: "2024-01-20",
      split_between: ["You", "Alice", "Bob", "Carol"],
      your_share: 30.0,
    },
    {
      id: 2,
      bill_type: "Gas",
      amount: 45.6,
      paid_by: "You",
      date: "2024-01-19",
      split_between: ["You", "Bob", "Carol"],
      your_share: 15.2,
    },
    {
      id: 3,
      bill_type: "Hotel",
      amount: 280.0,
      paid_by: "Bob Smith",
      date: "2024-01-18",
      split_between: ["You", "Alice", "Bob", "Carol"],
      your_share: 70.0,
    },
  ],
};

export default function GroupDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [activeTab, setActiveTab] = useState("expenses");

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
          <div className="flex-1">
            <h1 className="text-xl font-semibold">{mockGroupData.name}</h1>
            <p className="text-sm text-gray-600">
              {mockGroupData.members.length} members
            </p>
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="balances">Balances</TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" className="space-y-4 mt-4">
            <Link href={`/groups/${params.id}/add-expense`}>
              <Button className="w-full h-12 flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add Expense
              </Button>
            </Link>

            <div className="space-y-3">
              {mockGroupData.expenses.map((expense) => (
                <Card key={expense.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Receipt className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <Badge variant="secondary" className="mb-1">
                            {expense.bill_type}
                          </Badge>
                          <p className="text-sm text-gray-600">
                            Paid by {expense.paid_by}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">
                          ${expense.amount.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">
                          Your share: ${expense.your_share.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(expense.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        Split {expense.split_between.length} ways
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="balances" className="space-y-4 mt-4">
            <div className="space-y-3">
              {mockGroupData.members.map((member) => (
                <Card key={member.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={member.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          {member.balance === 0 && (
                            <p className="text-sm text-green-600">Settled up</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        {member.balance !== 0 && (
                          <>
                            <p
                              className={`text-sm ${
                                member.balance < 0
                                  ? "text-red-600"
                                  : "text-green-600"
                              }`}
                            >
                              {member.balance < 0 ? "Owes" : "Is owed"}
                            </p>
                            <p
                              className={`font-semibold text-lg ${
                                member.balance < 0
                                  ? "text-red-600"
                                  : "text-green-600"
                              }`}
                            >
                              ${Math.abs(member.balance).toFixed(2)}
                            </p>
                          </>
                        )}
                        {member.balance === 0 && (
                          <p className="font-semibold text-lg text-gray-400">
                            $0.00
                          </p>
                        )}
                      </div>
                    </div>
                    {member.balance !== 0 && member.name !== "You" && (
                      <div className="mt-3 pt-3 border-t">
                        <Button
                          size="sm"
                          variant={member.balance < 0 ? "default" : "outline"}
                          className="w-full"
                        >
                          {member.balance < 0 ? "Remind" : "Settle Up"}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
