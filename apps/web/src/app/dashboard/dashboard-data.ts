export type Ceremony = {
  id: string;
  day: string;
  year?: string;
  month: string;
  name: string;
  status: string;
  time: string;
  venue: string;
  guests: number;
  lead: string;
  initials: string;
  isWedding?: boolean;
};

export type WeddingTask = {
  id: string;
  title: string;
  due: string;
  owner: string;
  priority: "Urgent" | "High" | "Medium" | "Low";
  overdue: boolean;
  done: boolean;
};

// Public demo fixtures only. No real wedding, financial or guest records.
export const initialCeremonies: Ceremony[] = [
  { id: "haldi", month: "FEB", day: "12", name: "Haldi Ceremony & Phoolon Ki Holi", status: "Confirmed & Staffed", time: "10:00 AM – 1:00 PM", venue: "The Sunken Courtyard", guests: 180, lead: "Priya S.", initials: "PS" },
  { id: "mehendi", month: "FEB", day: "13", name: "Mehendi & Royal Sangeet Soirée", status: "Artist Soundcheck Pending", time: "4:00 PM – 11:30 PM", venue: "Maharani Lawn & Amphitheatre", guests: 350, lead: "Rohan M.", initials: "RM" },
  { id: "wedding", month: "FEB", day: "15", name: "Shubh Vivah, Baraat & Varmala", status: "Panditji & Muhurat Locked", time: "7:00 PM – 1:00 AM", venue: "Royal Mandap, Lakefront", guests: 420, lead: "Aditi S.", initials: "AS", isWedding: true },
  { id: "welcome", month: "FEB", day: "11", name: "Royal Welcome & Family Dinner", status: "Planning in Progress", time: "7:00 PM – 10:00 PM", venue: "Palace Terrace", guests: 180, lead: "Priya S.", initials: "PS" },
  { id: "reception", month: "FEB", day: "16", name: "Grand Royal Reception", status: "Venue Confirmed", time: "6:30 PM – 11:00 PM", venue: "Grand Palace Ballroom", guests: 500, lead: "Aditi S.", initials: "AS" },
];

export const initialTasks: WeddingTask[] = [
  { id: "t1", title: "Release 2nd Advance: Floral Decor", due: "Due yesterday", owner: "Kabir (Family)", priority: "Urgent", overdue: true, done: false },
  { id: "t2", title: "Approve Sangeet Choreography", due: "Due tomorrow", owner: "Siya (Bride)", priority: "High", overdue: false, done: false },
  { id: "t3", title: "Confirm Rambagh Room Allocation", due: "Due 18 Oct", owner: "Rajiv Chacha", priority: "Medium", overdue: true, done: false },
  { id: "t4", title: "Finalize Tasting Menu with Chef", due: "Due 28 Oct", owner: "Aarav (Groom)", priority: "Medium", overdue: false, done: false },
  { id: "t5", title: "Review Photographer Deliverables", due: "Due 29 Oct", owner: "Aditi S.", priority: "High", overdue: false, done: false },
  { id: "t6", title: "Confirm Airport Pickup Routes", due: "Due 30 Oct", owner: "Priya S.", priority: "High", overdue: false, done: false },
  { id: "t7", title: "Send Household RSVP Reminders", due: "Due today", owner: "Rohan M.", priority: "High", overdue: false, done: false },
  { id: "t8", title: "Approve Wedding Invitation Proof", due: "Due 24 Oct", owner: "Siya (Bride)", priority: "High", overdue: true, done: false },
  { id: "t9", title: "Review Guest Dietary Preferences", due: "Due 31 Oct", owner: "Priya S.", priority: "Medium", overdue: false, done: false },
  { id: "t10", title: "Collect Vendor Contact Details", due: "Due 2 Nov", owner: "Rohan M.", priority: "Low", overdue: false, done: false },
  { id: "t11", title: "Plan Family Portrait Schedule", due: "Due 3 Nov", owner: "Aditi S.", priority: "Medium", overdue: false, done: false },
  { id: "t12", title: "Prepare Welcome Hamper Notes", due: "Due 5 Nov", owner: "Siya (Bride)", priority: "Low", overdue: false, done: false },
];

export const demoVendors = [
  { name: "Royal Caterers Rajasthan", category: "Catering & Live Stations · Jaipur", status: "Contract Signed" },
  { name: "WedAmour Stories", category: "Cinematography & Pre-Wedding · Mumbai", status: "Deposit Paid" },
  { name: "Marigold & Mirrors Productions", category: "Floral & Mandap Architecture · Delhi", status: "Moodboard Review" },
  { name: "DJ Suketu & Troupe", category: "Sound, Lights & Sangeet Music", status: "Contract Sent" },
];

export const initialBudgetCategories = [
  { id: "venue", label: "Venue & Hospitality", budget: 1100000, spent: 800000 },
  { id: "catering", label: "Catering & Dining", budget: 650000, spent: 250000 },
  { id: "decor", label: "Decor & Production", budget: 400000, spent: 210000 },
  { id: "photography", label: "Photography & Film", budget: 200000, spent: 100000 },
  { id: "entertainment", label: "Entertainment & Rituals", budget: 150000, spent: 40000 },
] as const;

export type BudgetCategoryId = (typeof initialBudgetCategories)[number]["id"];
export type DemoExpense = { name: string; amount: number; category: BudgetCategoryId };
export type CategoryAllocation = { id: BudgetCategoryId; budget: number };
