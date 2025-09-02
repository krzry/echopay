"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Settings,
  Bell,
  CreditCard,
  Users,
  HelpCircle,
  LogOut,
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
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
          <h1 className="text-xl font-semibold">Profile</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Info */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" />
                <AvatarFallback className="text-2xl">ME</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">John Doe</h2>
                <p className="text-gray-600">john.doe@email.com</p>
                <Badge variant="secondary" className="mt-2">
                  Premium Member
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <p className="text-sm text-gray-600">Active Groups</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">$1,245</div>
              <p className="text-sm text-gray-600">Total Settled</p>
            </CardContent>
          </Card>
        </div>

        {/* Menu Items */}
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              <Link
                href="/settings"
                className="flex items-center gap-3 p-4 hover:bg-gray-50"
              >
                <Settings className="h-5 w-5 text-gray-600" />
                <span className="flex-1">Settings</span>
              </Link>
              <Link
                href="/notifications"
                className="flex items-center gap-3 p-4 hover:bg-gray-50"
              >
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="flex-1">Notifications</span>
              </Link>
              <Link
                href="/payment-methods"
                className="flex items-center gap-3 p-4 hover:bg-gray-50"
              >
                <CreditCard className="h-5 w-5 text-gray-600" />
                <span className="flex-1">Payment Methods</span>
              </Link>
              <Link
                href="/friends"
                className="flex items-center gap-3 p-4 hover:bg-gray-50"
              >
                <Users className="h-5 w-5 text-gray-600" />
                <span className="flex-1">Friends</span>
              </Link>
              <Link
                href="/help"
                className="flex items-center gap-3 p-4 hover:bg-gray-50"
              >
                <HelpCircle className="h-5 w-5 text-gray-600" />
                <span className="flex-1">Help & Support</span>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full h-12 text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
