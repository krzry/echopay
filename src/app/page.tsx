"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Users,
  Receipt,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import Link from "next/link";

// Mock data based on the database schema
const mockBalances = [
  {
    id: 1,
    borrower_id: 2,
    amount: -25.5,
    member_name: "Alice Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    borrower_id: 3,
    amount: 15.75,
    member_name: "Bob Smith",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    borrower_id: 4,
    amount: -8.25,
    member_name: "Carol Davis",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const recentExpenses = [
  {
    id: 1,
    bill_type: "Restaurant",
    amount: 45.6,
    group_name: "Weekend Trip",
    date: "2024-01-20",
    paid_by: "You",
  },
  {
    id: 2,
    bill_type: "Gas",
    amount: 32.4,
    group_name: "Road Trip",
    date: "2024-01-19",
    paid_by: "Alice",
  },
  {
    id: 3,
    bill_type: "Groceries",
    amount: 28.75,
    group_name: "Roommates",
    date: "2024-01-18",
    paid_by: "Bob",
  },
];

export default function Home() {
  const [totalBalance] = useState(-18.0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white border-b px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">EchoPay</h1>
          <span>Hi</span>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Balance Overview */}
        <div className="bg-white border-b">
          <div className="flex flex-col space-y-1.5 p-6 pb-3">
            <h3 className="text-black font-semibold tracking-tight text-lg">
              Your balance
            </h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500"> $18.00</div>
              <p className="text-sm text-gray-600 mt-1">You owe in total</p>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/add-expense">
            <Button className="w-full h-16 flex flex-col gap-2">
              <Plus className="h-5 w-5" />
              Add Expense
            </Button>
          </Link>
          <Link href="/groups">
            <Button
              variant="outline"
              className="w-full h-16 flex flex-col gap-2 bg-transparent"
            >
              <Users className="h-5 w-5" />
              Groups
            </Button>
          </Link>
        </div>

        {/* Balances */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Balances
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockBalances.map((balance) => (
              <div
                key={balance.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={balance.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {balance.member_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{balance.member_name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {balance.amount < 0 ? (
                    <ArrowUpRight className="h-4 w-4 text-red-500" />
                  ) : (
                    <ArrowDownLeft className="h-4 w-4 text-green-500" />
                  )}
                  <span
                    className={`font-semibold ${
                      balance.amount < 0 ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    ${Math.abs(balance.amount).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">
                      {expense.bill_type}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {expense.group_name}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Paid by {expense.paid_by} •{" "}
                    {new Date(expense.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${expense.amount.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="grid grid-cols-4 py-2">
          <Link
            href="/"
            className="flex flex-col items-center py-2 text-blue-600"
          >
            <Receipt className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            href="/groups"
            className="flex flex-col items-center py-2 text-gray-600"
          >
            <Users className="h-5 w-5" />
            <span className="text-xs mt-1">Groups</span>
          </Link>
          <Link
            href="/add-expense"
            className="flex flex-col items-center py-2 text-gray-600"
          >
            <Plus className="h-5 w-5" />
            <span className="text-xs mt-1">Add</span>
          </Link>
          <Link
            href="/profile"
            className="flex flex-col items-center py-2 text-gray-600"
          >
            <Avatar className="h-5 w-5">
              <AvatarFallback className="text-xs">ME</AvatarFallback>
            </Avatar>
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
      <div className="flex-none h-[20px] flex items-center justify-center">
        Footer Content
      </div>
    </div>
  );
}
