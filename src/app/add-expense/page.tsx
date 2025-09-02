"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, DollarSign, Users, Receipt } from "lucide-react";
import Link from "next/link";

// Mock data
const mockGroups = [
  { id: 1, name: "Weekend Trip" },
  { id: 2, name: "Roommates" },
  { id: 3, name: "Office Lunch" },
];

const mockBillTypes = [
  { id: 1, name: "Restaurant" },
  { id: 2, name: "Gas" },
  { id: 3, name: "Groceries" },
  { id: 4, name: "Hotel" },
  { id: 5, name: "Entertainment" },
  { id: 6, name: "Other" },
];

const mockMembers = [
  { id: 1, name: "You", avatar: "/placeholder.svg?height=40&width=40" },
  {
    id: 2,
    name: "Alice Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  { id: 3, name: "Bob Smith", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 4, name: "Carol Davis", avatar: "/placeholder.svg?height=40&width=40" },
];

export default function AddExpensePage() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedBillType, setSelectedBillType] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<number[]>([1]); // You are always selected
  const [paidBy, setPaidBy] = useState("1"); // You by default

  const handleMemberToggle = (memberId: number) => {
    if (memberId === 1) return; // Can't unselect yourself

    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      amount: Number.parseFloat(amount),
      description,
      group_id: selectedGroup,
      bill_type_id: selectedBillType,
      paid_by: paidBy,
      split_between: selectedMembers,
    });
  };

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
          <h1 className="text-xl font-semibold">Add Expense</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Amount */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                $
              </span>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8 text-lg h-12"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="What was this expense for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[80px]"
            />
          </CardContent>
        </Card>

        {/* Group & Category */}
        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Group
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={selectedGroup}
                onValueChange={setSelectedGroup}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a group" />
                </SelectTrigger>
                <SelectContent>
                  {mockGroups.map((group) => (
                    <SelectItem key={group.id} value={group.id.toString()}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Category</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={selectedBillType}
                onValueChange={setSelectedBillType}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {mockBillTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id.toString()}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* Paid By */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Paid By</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={paidBy} onValueChange={setPaidBy} required>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {mockMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id.toString()}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Split Between */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Split Between</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockMembers.map((member) => (
              <div key={member.id} className="flex items-center space-x-3">
                <Checkbox
                  id={`member-${member.id}`}
                  checked={selectedMembers.includes(member.id)}
                  onCheckedChange={() => handleMemberToggle(member.id)}
                  disabled={member.id === 1} // Can't unselect yourself
                />
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Label
                  htmlFor={`member-${member.id}`}
                  className="flex-1 cursor-pointer"
                >
                  {member.name}
                </Label>
                {amount && selectedMembers.includes(member.id) && (
                  <span className="text-sm text-gray-600">
                    $
                    {(
                      Number.parseFloat(amount || "0") / selectedMembers.length
                    ).toFixed(2)}
                  </span>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button type="submit" className="w-full h-12 text-lg">
          Add Expense
        </Button>
      </form>
    </div>
  );
}
