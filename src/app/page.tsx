"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  Heart, 
  MessageCircle, 
  Repeat, 
  Send, 
  MapPin, 
  CheckCircle, 
  ChevronDown, 
  Check, 
  Home, 
  Search, 
  Plus, 
  User, 
  Rss,
  Image as ImageIcon,
  Smile,
  Globe,
  X,
  Users,
  Lock,
  Calendar
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function HomePage() {
  // State for new post modal
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [audience, setAudience] = useState("everyone");
  const [charCount, setCharCount] = useState(0);
  const MAX_CHARS = 280;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // State for confetti animation
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiContainerRef = useRef<HTMLDivElement>(null);
  
  // Update character count when post content changes
  useEffect(() => {
    setCharCount(postContent.length);
  }, [postContent]);
  
  // Function to create confetti elements
  const createConfetti = () => {
    const confettiContainer = confettiContainerRef.current;
    if (!confettiContainer) return;
    
    // Clear any existing confetti
    confettiContainer.innerHTML = '';
    
    // Colors for confetti
    const colors = ['#1DA1F2', '#FF1493', '#FFD700', '#9932CC', '#32CD32'];
    const shapes = ['square', 'circle', 'triangle'];
    
    // Create 150 confetti elements (increased from 100)
    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement('div');
      confetti.className = `confetti ${shapes[Math.floor(Math.random() * shapes.length)]}`;
      
      // Random position
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = `${Math.random() * 20 - 20}%`; // Start above the viewport
      
      // Random size
      const size = Math.random() * 10 + 5; // Slightly larger confetti (5-15px)
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      
      // Random color
      const color = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.backgroundColor = color;
      if (confetti.classList.contains('triangle')) {
        confetti.style.borderBottomColor = color;
      }
      
      // Random rotation
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      // Random animation duration
      const fallDuration = Math.random() * 3 + 3; // 3-6 seconds
      const sideDuration = Math.random() * 2 + 2; // 2-4 seconds
      confetti.style.animationDuration = `${fallDuration}s, ${sideDuration}s`;
      
      // Random delay
      const delay = Math.random() * 0.5;
      confetti.style.animationDelay = `${delay}s, ${delay}s`;
      
      confettiContainer.appendChild(confetti);
    }
  };
  
  // Function to handle opening the new post modal with confetti
  const handleOpenNewPost = () => {
    setNewPostOpen(true);
    setShowConfetti(true);
    createConfetti();
    
    // Hide confetti after 6 seconds (increased from 5)
    setTimeout(() => {
      setShowConfetti(false);
    }, 6000);
  };
  
  // Function to handle post submission
  const handlePostSubmit = () => {
    // Here you would typically send the post data to your backend
    console.log({
      content: postContent,
      images: selectedImages,
      location,
      audience
    });
    
    // Reset form and close modal
    setPostContent("");
    setSelectedImages([]);
    setLocation("");
    setAudience("everyone");
    setNewPostOpen(false);
  };
  
  // Function to handle image selection
  const handleImageSelect = () => {
    // This would typically open a file picker
    // For demo purposes, we'll just add some sample images
    const demoImages = [
      "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&auto=format&fit=crop&q=60",
    ];
    
    setSelectedImages([...selectedImages, ...demoImages]);
  };
  
  // Function to remove an image
  const removeImage = (index: number) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };
  
  // Function to detect hashtags in real-time
  const detectHashtags = (text: string) => {
    const hashtagRegex = /#[a-zA-Z0-9_]+/g;
    const matches = text.match(hashtagRegex);
    return matches ? matches : [];
  };
  
  // Function to add emoji to post content
  const addEmoji = (emoji: string) => {
    setPostContent(prev => prev + emoji);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };
  
  // Sample emojis for the picker
  const sampleEmojis = ["😊", "👍", "🔥", "❤️", "🎉", "🙌", "😂", "🤔", "👀", "✨"];
  
  // Get current date for scheduling
  const getCurrentDate = () => {
    const now = new Date();
    return now.toISOString().split('T')[0];
  };

  // Sample thread data
  const threads = [
    {
      id: 1,
      author: {
        name: "John Doe",
        username: "johndoe",
        avatar: "https://github.com/shadcn.png",
        verified: true
      },
      content: "Just launched my new website! Check it out and let me know what you think. #webdev #launch",
      timestamp: "2h ago",
      likes: 24,
      replies: 5,
      reposts: 3,
      shares: 1,
      images: [
        "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=800&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?w=800&auto=format&fit=crop&q=60"
      ],
      location: "San Francisco, CA"
    },
    {
      id: 2,
      author: {
        name: "Jane Smith",
        username: "janesmith",
        avatar: "https://github.com/shadcn.png",
        verified: false
      },
      content: "Working on a new project using #NextJS and #shadcn. The developer experience is amazing!",
      timestamp: "4h ago",
      likes: 42,
      replies: 8,
      reposts: 12,
      shares: 5,
      images: [
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60"
      ],
      location: "New York, NY"
    },
    {
      id: 3,
      author: {
        name: "Alex Johnson",
        username: "alexj",
        avatar: "https://github.com/shadcn.png",
        verified: true
      },
      content: "Just finished reading 'Atomic Habits'. Highly recommend it to anyone looking to build better habits. #reading #productivity",
      timestamp: "6h ago",
      likes: 18,
      replies: 3,
      reposts: 7,
      shares: 2,
      images: [],
      location: ""
    },
  ];

  // Function to highlight hashtags in blue
  const formatContent = (content: string) => {
    return content.split(' ').map((word, index) => {
      if (word.startsWith('#')) {
        return (
          <span key={index} className="text-[#1DA1F2]">
            {word}{' '}
          </span>
        );
      }
      return word + ' ';
    });
  };

  // Available pages for the page switcher
  const pages = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "Profile", path: "/profile" },
    { name: "Notifications", path: "/notifications" }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Confetti container */}
      {showConfetti && <div ref={confettiContainerRef} className="confetti-container"></div>}
      
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      
      {/* Side Navigation */}
      <div className="side-navigation">
        <Link href="/" className="nav-icon-active">
          <Home size={28} />
        </Link>
        <Link href="/explore" className="nav-icon">
          <Search size={28} />
        </Link>
        <button className="nav-icon" onClick={handleOpenNewPost}>
          <Plus size={28} />
        </button>
        <Link href="/notifications" className="nav-icon">
          <Heart size={28} />
        </Link>
        <Link href="/profile" className="nav-icon">
          <User size={28} />
        </Link>
      </div>
      
      {/* New Post Modal */}
      <Dialog open={newPostOpen} onOpenChange={setNewPostOpen}>
        <DialogContent className="sm:max-w-[500px] modal-animation">
          <DialogHeader className="border-b border-gray-200 dark:border-gray-800 pb-4">
            <DialogTitle className="text-xl font-bold">Create new post</DialogTitle>
          </DialogHeader>
          
          <div className="flex gap-4 mt-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://github.com/shadcn.png" alt="Your profile" />
              <AvatarFallback>YP</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Your Name</span>
                <span className="verified-badge">
                  <CheckCircle size={16} fill="#1DA1F2" stroke="none" />
                </span>
                
                <Select value={audience} onValueChange={setAudience}>
                  <SelectTrigger className="w-[140px] h-8 ml-auto">
                    <SelectValue placeholder="Who can see this?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="everyone">
                      <div className="flex items-center gap-2">
                        <Globe size={16} />
                        <span>Everyone</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="followers">
                      <div className="flex items-center gap-2">
                        <Users size={16} />
                        <span>Followers</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="mentioned">
                      <div className="flex items-center gap-2">
                        <Lock size={16} />
                        <span>Mentioned only</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  className="w-full min-h-[120px] bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none resize-none text-lg"
                  placeholder="What's happening?"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  maxLength={MAX_CHARS}
                />
                
                <div className={`character-counter absolute bottom-2 right-2 ${
                  charCount > MAX_CHARS * 0.8 && charCount < MAX_CHARS 
                    ? 'limit-near' 
                    : charCount === MAX_CHARS 
                      ? 'limit-reached' 
                      : ''
                }`}>
                  {charCount}/{MAX_CHARS}
                </div>
              </div>
              
              {detectHashtags(postContent).length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {detectHashtags(postContent).map((hashtag, index) => (
                    <span key={index} className="bg-blue-50 dark:bg-blue-900/20 text-[#1DA1F2] px-2 py-1 rounded-md text-sm">
                      {hashtag}
                    </span>
                  ))}
                </div>
              )}
              
              {selectedImages.length > 0 && (
                <div className={`image-preview-grid grid-${Math.min(selectedImages.length, 4)}`}>
                  {selectedImages.map((image, index) => (
                    <div key={index} className="image-preview-item">
                      <img src={image} alt={`Post image ${index + 1}`} />
                      <button 
                        className="image-remove-button"
                        onClick={() => removeImage(index)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="location-input-container">
                <MapPin size={18} className="text-muted-foreground mr-2" />
                <input
                  type="text"
                  placeholder="Add location"
                  className="location-input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button 
                  className="emoji-picker-button text-[#1DA1F2]"
                  onClick={handleImageSelect}
                >
                  <ImageIcon size={20} />
                </button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="emoji-picker-button text-[#1DA1F2]">
                      <Smile size={20} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="p-2">
                    <div className="grid grid-cols-5 gap-2">
                      {sampleEmojis.map((emoji, index) => (
                        <button 
                          key={index} 
                          className="text-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                          onClick={() => addEmoji(emoji)}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="emoji-picker-button text-[#1DA1F2]">
                      <Calendar size={20} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="p-4 w-[300px]">
                    <div className="space-y-4">
                      <h3 className="font-medium">Schedule post</h3>
                      <div className="space-y-2">
                        <label className="text-sm text-muted-foreground">Date</label>
                        <Input type="date" min={getCurrentDate()} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-muted-foreground">Time</label>
                        <Input type="time" />
                      </div>
                      <Button className="w-full">Set schedule</Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <Button 
                className={`bg-[#1DA1F2] hover:bg-[#1a91da] text-white rounded-full px-5 ${
                  (!postContent.trim() && selectedImages.length === 0) ? 'post-button-disabled' : ''
                }`}
                onClick={handlePostSubmit}
                disabled={!postContent.trim() && selectedImages.length === 0}
              >
                Post
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Page Switcher */}
      <div className="page-switcher">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="page-switcher-button">
              Home
              <ChevronDown size={18} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="page-menu">
            {pages.map((page) => (
              <DropdownMenuItem key={page.path} asChild>
                <Link 
                  href={page.path} 
                  className={page.name === "Home" ? "page-menu-item-active" : "page-menu-item"}
                >
                  {page.name}
                  {page.name === "Home" && <Check className="ml-auto" size={18} />}
                </Link>
              </DropdownMenuItem>
            ))}
            <div className="page-menu-divider"></div>
            <DropdownMenuItem asChild>
              <Link href="/new-feed" className="page-menu-new-feed">
                <Rss className="mr-2" size={18} />
                Create new feed
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <main className="flex-1 flex flex-col">
        <div className="central-feed">
          <div className="central-feed-content">
            {/* What's new input */}
            <div className="whats-new">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="Your profile" />
                <AvatarFallback>YP</AvatarFallback>
              </Avatar>
              <Input 
                type="text" 
                placeholder="What's new?" 
                className="whats-new-input"
              />
              <Button className="post-button">Post</Button>
            </div>
            
            <div className="mt-4 space-y-0">
              {threads.map((thread) => (
                <div key={thread.id} className="post-divider py-4 last:border-0">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src={thread.author.avatar} alt={thread.author.name} />
                      <AvatarFallback>{thread.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div>
                            <div className="flex items-center">
                              <p className="font-bold">{thread.author.name}</p>
                              {thread.author.verified && (
                                <span className="verified-badge">
                                  <CheckCircle size={16} fill="#1DA1F2" stroke="none" />
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">@{thread.author.username}</p>
                          </div>
                          <p className="text-sm text-muted-foreground ml-2.5">{thread.timestamp}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More options</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Copy link</DropdownMenuItem>
                            <DropdownMenuItem>Report</DropdownMenuItem>
                            <DropdownMenuItem>Mute user</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <p className="text-base font-normal">{formatContent(thread.content)}</p>
                      
                      {thread.images && thread.images.length > 0 && (
                        <>
                          <div className={`post-images grid-${thread.images.length > 1 ? '2' : '1'}`}>
                            {thread.images.map((image, index) => (
                              <div key={index} className="post-image">
                                <img src={image} alt={`Post image ${index + 1}`} />
                              </div>
                            ))}
                          </div>
                          {thread.location && (
                            <div className="location-text flex items-center">
                              <MapPin size={14} className="mr-1" />
                              {thread.location}
                            </div>
                          )}
                        </>
                      )}
                      
                      <div className="post-interactions">
                        <button className="interaction-button">
                          <Heart size={18} />
                          <span>{thread.likes}</span>
                        </button>
                        <button className="interaction-button">
                          <MessageCircle size={18} />
                          <span>{thread.replies}</span>
                        </button>
                        <button className="interaction-button">
                          <Repeat size={18} />
                          <span>{thread.reposts}</span>
                        </button>
                        <button className="interaction-button">
                          <Send size={18} />
                          <span>{thread.shares}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      {/* New Post Button */}
      <div className="new-post-button" onClick={handleOpenNewPost}>
        <Plus size={24} className="text-gray-900 dark:text-white" />
      </div>
    </div>
  );
}
