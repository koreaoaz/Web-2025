/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Mail, Bell, Star, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function ComponentShowcase() {
  const [activeTab, setActiveTab] = useState("buttons");

  const components = {
    buttons: [
      { name: "Primary", component: <Button>Primary</Button> },
      { name: "Secondary", component: <Button variant="secondary">Secondary</Button> },
      { name: "Outline", component: <Button variant="outline">Outline</Button> },
      { name: "Ghost", component: <Button variant="ghost">Ghost</Button> },
    ],
    cards: [
      {
        name: "Feature Card",
        component: (
          <Card className="w-80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Featured
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">This is a beautiful card component with an icon.</p>
            </CardContent>
          </Card>
        )
      }
    ],
    badges: [
      { name: "Default", component: <Badge>Default</Badge> },
      { name: "Secondary", component: <Badge variant="secondary">Secondary</Badge> },
      { name: "Outline", component: <Badge variant="outline">Outline</Badge> },
      { name: "Destructive", component: <Badge variant="destructive">Destructive</Badge> },
    ],
    icons: [
      { name: "Calendar", component: <Calendar className="w-8 h-8 text-blue-500" /> },
      { name: "Mail", component: <Mail className="w-8 h-8 text-green-500" /> },
      { name: "Bell", component: <Bell className="w-8 h-8 text-yellow-500" /> },
      { name: "Heart", component: <Heart className="w-8 h-8 text-red-500" /> },
    ]
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Beautiful Components
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Over 50+ beautiful components built with Radix UI and Tailwind CSS. 
            Copy, paste, and customize to your heart&apos;s content.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-gray-200 bg-gray-50/50">
              <TabsList className="h-auto p-1 bg-transparent w-full justify-start">
                <TabsTrigger 
                  value="buttons" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-6 py-3 text-sm font-medium"
                >
                  Buttons
                </TabsTrigger>
                <TabsTrigger 
                  value="cards" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-6 py-3 text-sm font-medium"
                >
                  Cards
                </TabsTrigger>
                <TabsTrigger 
                  value="badges" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-6 py-3 text-sm font-medium"
                >
                  Badges
                </TabsTrigger>
                <TabsTrigger 
                  value="icons" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-6 py-3 text-sm font-medium"
                >
                  Icons
                </TabsTrigger>
              </TabsList>
            </div>

            {Object.entries(components).map(([key, items]) => (
              <TabsContent key={key} value={key} className="p-8 m-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="text-center space-y-4"
                    >
                      <div className="p-6 bg-gray-50 rounded-xl flex items-center justify-center min-h-[120px]">
                        {item.component}
                      </div>
                      <p className="text-sm font-medium text-gray-600">{item.name}</p>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-4">
            Browse All Components
          </Button>
        </motion.div>
      </div>
    </section>
  );
}