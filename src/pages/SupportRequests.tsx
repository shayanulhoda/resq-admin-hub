import { useState } from "react";
import { Header } from "@/components/admin/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MessageSquare, X, Send } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const mockSupportRequests = [
  {
    id: 1,
    userName: "John Smith",
    requestTime: "2024-11-18 10:30 AM",
    lastMessageTime: "2024-11-18 11:45 AM",
    messages: [
      { sender: "user", text: "I cannot upload my food certificate", time: "10:30 AM" },
      { sender: "admin", text: "I'll help you with that. What error are you seeing?", time: "10:35 AM" },
      { sender: "user", text: "It says file size is too large", time: "11:45 AM" },
    ],
  },
  {
    id: 2,
    userName: "Sarah Johnson",
    requestTime: "2024-11-18 09:15 AM",
    lastMessageTime: "2024-11-18 09:20 AM",
    messages: [
      { sender: "user", text: "When will my restaurant be approved?", time: "09:15 AM" },
      { sender: "admin", text: "We're reviewing your application. Should be done by tomorrow.", time: "09:20 AM" },
    ],
  },
  {
    id: 3,
    userName: "Mike Chen",
    requestTime: "2024-11-17 04:30 PM",
    lastMessageTime: "2024-11-17 05:00 PM",
    messages: [
      { sender: "user", text: "How do I update my menu items?", time: "04:30 PM" },
      { sender: "admin", text: "Go to your dashboard and click on Menu Management", time: "05:00 PM" },
    ],
  },
];

export default function SupportRequests() {
  const [selectedRequest, setSelectedRequest] = useState<typeof mockSupportRequests[0] | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");

  const handleOpenChat = (request: typeof mockSupportRequests[0]) => {
    setSelectedRequest(request);
    setIsSheetOpen(true);
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // In a real app, send message to backend
      console.log("Sending message:", messageInput);
      setMessageInput("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Support Requests"
        subtitle="Manage and respond to customer support inquiries"
      />

      <main className="p-6 space-y-6">
        <div className="bg-card rounded-lg border card-shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Name</TableHead>
                <TableHead>Request Time</TableHead>
                <TableHead>Last Message Time</TableHead>
                <TableHead className="text-right">Chat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSupportRequests.map((request) => (
                <TableRow key={request.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{request.userName}</TableCell>
                  <TableCell>{request.requestTime}</TableCell>
                  <TableCell>{request.lastMessageTime}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenChat(request)}
                      className="hover:bg-primary/10"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>

      {/* Chat Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
          <SheetHeader>
            <SheetTitle>Chat with {selectedRequest?.userName}</SheetTitle>
            <SheetDescription>
              Request started at {selectedRequest?.requestTime}
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="flex-1 pr-4 mt-4">
            <div className="space-y-4">
              {selectedRequest?.messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === "admin" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "admin"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === "admin"
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t pt-4 mt-4">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
