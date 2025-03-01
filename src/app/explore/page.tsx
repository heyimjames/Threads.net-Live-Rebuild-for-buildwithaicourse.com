"use client";

import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  ChevronDown, 
  CheckCircle, 
  Check, 
  Home, 
  Search, 
  Plus, 
  Heart, 
  User, 
  Rss,
  Image as ImageIcon,
  Smile,
  Globe,
  X,
  Users,
  Lock,
  Calendar,
  MapPin
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function ExplorePage() {
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

  // Sample trending topics
  const trendingTopics = [
    { id: 1, name: "Technology", posts: 1243 },
    { id: 2, name: "Design", posts: 982 },
    { id: 3, name: "Programming", posts: 756 },
    { id: 4, name: "AI", posts: 543 },
    { id: 5, name: "Web Development", posts: 421 },
  ];

  // Sample suggested users
  const suggestedUsers = [
    {
      id: 1,
      name: "Sarah Johnson",
      username: "sarahj",
      avatar: "https://github.com/shadcn.png",
      bio: "UX Designer | Coffee enthusiast",
      verified: true
    },
    {
      id: 2,
      name: "Michael Chen",
      username: "mikechen",
      avatar: "https://github.com/shadcn.png",
      bio: "Software Engineer at Tech Co.",
      verified: false
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      username: "emilyr",
      avatar: "https://github.com/shadcn.png",
      bio: "Digital Marketer | Travel lover",
      verified: true
    },
  ];

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
        <Link href="/" className="nav-icon">
          <Home size={28} />
        </Link>
        <Link href="/explore" className="nav-icon-active">
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
              Explore
              <ChevronDown size={18} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="page-menu">
            {pages.map((page) => (
              <DropdownMenuItem key={page.path} asChild>
                <Link 
                  href={page.path} 
                  className={page.name === "Explore" ? "page-menu-item-active" : "page-menu-item"}
                >
                  {page.name}
                  {page.name === "Explore" && <Check className="ml-auto" size={18} />}
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
            <div className="mb-8">
              <Input
                type="search"
                placeholder="Search..."
                className="max-w-md mx-auto"
              />
            </div>

            <Tabs defaultValue="trending" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 max-w-md mx-auto">
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="suggested">Suggested Users</TabsTrigger>
              </TabsList>
              <TabsContent value="trending" className="space-y-0">
                {trendingTopics.map((topic) => (
                  <div key={topic.id} className="post-divider py-4 last:border-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">#{topic.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {topic.posts} posts
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="suggested" className="space-y-0">
                {suggestedUsers.map((user) => (
                  <div key={user.id} className="post-divider py-4 last:border-0">
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-semibold">{user.name}</h3>
                          {user.verified && (
                            <span className="verified-badge">
                              <CheckCircle size={16} fill="#1DA1F2" stroke="none" />
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          @{user.username}
                        </p>
                        <p className="text-sm mt-1">{user.bio}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
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