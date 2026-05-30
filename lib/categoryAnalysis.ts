// Expert analysis shown on the Solve page above product recommendations.
// Each entry explains WHY the problem happens and WHAT to look for when buying.

export interface CategoryAnalysis {
  headline: string;
  explanation: string;
  lookFor: string[];
  compareLabels: {
    row1: string;
    row2: string;
    row3: string;
  };
}

export const categoryAnalysis: Record<string, CategoryAnalysis> = {
  seating: {
    headline: "Why your back and neck hurt when gaming",
    explanation: "Extended gaming sessions cause back and neck pain for one core reason: static posture. Your spine needs to shift position throughout the day, but a gaming chair with inadequate lumbar support locks you in one angle. Most budget chairs also use foam that compresses within 6-12 months, removing the support you paid for. A proper ergonomic chair has adjustable lumbar that stays in contact with your lower back even as you lean and shift.",
    lookFor: [
      "Adjustable lumbar support (not just a fixed pillow)",
      "Multi-tilt recline mechanism to shift pressure during sessions",
      "4D armrests that align with your desk height",
      "High-density cold-cure foam that holds its shape for years",
    ],
    compareLabels: { row1: "Lumbar System", row2: "Armrests", row3: "Best Session Length" },
  },

  "budget-headset": {
    headline: "Why cheap headsets disappoint — and what to look for",
    explanation: "Most headsets under $30 cut corners on the driver tuning — they produce muddy mids that make it hard to hear teammate callouts and directional audio. The microphone is usually the weakest part: a basic omni-directional capsule that picks up fans, keyboards, and background noise equally. The good news: at $40-50 there are headsets from serious audio brands that sound dramatically better and include noise-filtering mics.",
    lookFor: [
      "Named brand drivers (50mm directional preferred for gaming)",
      "Unidirectional or cardioid microphone — rejects background noise",
      "Closed-back design for passive noise isolation",
      "Memory foam ear cushions for longer sessions",
    ],
    compareLabels: { row1: "Driver Size", row2: "Mic Type", row3: "Platform Support" },
  },

  microphone: {
    headline: "Why your microphone sounds bad — and how to fix it",
    explanation: "A microphone that sounds bad is almost never the mic itself — it is usually the polar pattern setting or missing accessories. Using an omnidirectional pattern in a typical room picks up every fan, keyboard click, and room echo. Without a shock mount, desk vibrations transmit directly into the audio. Without a pop filter, hard consonants peak the signal. The right mic with the right setup sounds studio-quality without any audio processing.",
    lookFor: [
      "Cardioid polar pattern for single-voice recording",
      "Built-in or included shock mount to kill desk vibration",
      "Built-in or included pop filter to stop plosives",
      "Zero-latency headphone monitoring so you hear yourself clearly",
    ],
    compareLabels: { row1: "Polar Pattern", row2: "Shock Mount", row3: "Pop Filter" },
  },

  "fps-mouse": {
    headline: "Why your aim feels inconsistent in FPS games",
    explanation: "Inconsistent aim in FPS games has three main causes: sensor imprecision, mouse weight causing fatigue-based drift, and inadequate mousepad surface. Above $50, almost every mouse uses a competition-grade sensor — so if your aim is still off, the culprit is likely mouse weight. Heavy mice cause your wrist to fatigue mid-match, which makes micro-adjustments harder in the later rounds of a session. Lighter mice (under 70g) let you hold positions longer without shaking.",
    lookFor: [
      "Mouse weight under 80g to reduce wrist fatigue",
      "Optical sensor — no acceleration, no smoothing, no prediction",
      "Symmetric or ergonomic shape that matches your grip style",
      "PTFE mouse feet for consistent glide across all surfaces",
    ],
    compareLabels: { row1: "Weight", row2: "Sensor DPI", row3: "Wireless" },
  },

  "sweaty-hands": {
    headline: "Why your hands get sweaty and what actually helps",
    explanation: "Sweaty hands while gaming are caused by elevated heart rate and nervous system activation — completely normal for competitive play. The problem is that standard mouse coatings become slippery when wet, breaking your grip mid-match. The fix is either a mouse with grip texturing or moisture-resistant coating designed for this, or gaming gloves that absorb moisture before it reaches the mouse. A good mousepad with texture also helps prevent the mouse from hydroplaning.",
    lookFor: [
      "Rubberized or textured side grips engineered for moisture",
      "Matte coating — glossy finishes become dangerously slippery when wet",
      "Optical switches — sweat on buttons causes mechanical switch bounce",
      "Fingerless gaming gloves as a universal solution for any mouse",
    ],
    compareLabels: { row1: "Grip Type", row2: "Coating", row3: "Switch Type" },
  },

  keyboard: {
    headline: "Why your keyboard is holding back your competitive play",
    explanation: "Standard mechanical keyboards have a fixed actuation point and a fixed reset point — meaning the key must physically return past a certain position before it can fire again. In fast games, this creates a hard ceiling on how quickly you can counter-strafe or re-input movement. High-end competitive keyboards with adjustable actuation and rapid trigger technology remove this ceiling, letting the key register a new press the instant you re-press it.",
    lookFor: [
      "Rapid Trigger or adjustable reset point for faster re-inputs",
      "Tenkeyless or 60% layout to move the mouse closer to center",
      "Hot-swappable switches so you can change feel without soldering",
      "Wireless with low-latency dongle for a cleaner desk setup",
    ],
    compareLabels: { row1: "Layout", row2: "Rapid Trigger", row3: "Switch Type" },
  },

  monitor: {
    headline: "Why screen tearing and blur affect your performance",
    explanation: "Screen tearing happens when your GPU outputs frames at a rate that doesn't sync with your monitor's refresh cycle — the monitor displays half of one frame and half of another simultaneously. This creates a visible horizontal line mid-screen and makes tracking moving targets harder. At 144Hz or above, the refresh cycle is fast enough that tears become invisible even without sync technology. VRR (G-Sync or FreeSync) eliminates them entirely by making the monitor wait for the GPU.",
    lookFor: [
      "Minimum 144Hz refresh rate — 165Hz or 240Hz for competitive play",
      "G-Sync Compatible or FreeSync Premium for tear-free output",
      "1ms response time (GtG) to prevent ghosting behind fast movement",
      "IPS or Nano IPS panel for colour accuracy without sacrificing speed",
    ],
    compareLabels: { row1: "Refresh Rate", row2: "Sync Tech", row3: "Panel Type" },
  },

  streaming: {
    headline: "What you actually need to start streaming",
    explanation: "Most people starting out over-invest in equipment and under-invest in audio. Viewers will tolerate a 720p picture but will immediately leave a stream with bad audio. Your priority order should be: good microphone first, then camera, then production tools like a capture card or stream deck. A clean, well-lit face with clear audio builds an audience faster than a 4K camera with distorted sound.",
    lookFor: [
      "USB microphone with cardioid pickup as the first purchase",
      "1080p60 webcam — 4K is unnecessary until you have an established audience",
      "Capture card only if streaming from console — PC streamers don't need one",
      "Stream Deck or similar for scene switching without alt-tabbing",
    ],
    compareLabels: { row1: "Resolution", row2: "Compatibility", row3: "Setup Complexity" },
  },

  "wrist-pain": {
    headline: "Why your wrist hurts and how to prevent long-term damage",
    explanation: "Wrist pain from gaming is repetitive strain — the same tendons flexing thousands of times per session with no neutral rest position. The main culprit is wrist extension: if your wrist is bent upward to reach the mouse or keyboard, you are compressing the carpal tunnel with every movement. A wrist rest keeps the joint flat, and a lower DPI (requiring larger arm movements instead of wrist flicks) dramatically reduces the repetitive load.",
    lookFor: [
      "Wrist rest that keeps your wrist neutral and flat — not elevated",
      "Ergonomic mouse shape that reduces forearm pronation (rolling inward)",
      "Extended desk mat so your wrist never rests on the hard desk edge",
      "Higher DPI on your mouse to reduce the movement range needed",
    ],
    compareLabels: { row1: "Material", row2: "Coverage", row3: "Wrist Position" },
  },

  lighting: {
    headline: "Why your lighting matters for both eyes and streaming",
    explanation: "Dark gaming rooms cause two problems: eye strain from the contrast between a bright screen and dark surroundings, and poor webcam quality because cameras perform terribly in low light. Bias lighting (placing a light source behind your monitor) reduces the contrast ratio your eyes have to handle. A key light in front of you provides the flat, even illumination cameras need to produce a sharp, noise-free image.",
    lookFor: [
      "Bias lighting behind the monitor to reduce eye strain contrast",
      "Key light positioned at face level in front — not overhead",
      "Adjustable colour temperature (warm for streaming, cool for focus)",
      "RGB strips with music sync for aesthetic and ambient mood",
    ],
    compareLabels: { row1: "Light Type", row2: "Max Brightness", row3: "Color Control" },
  },

  controller: {
    headline: "Why the right controller matters for PC gaming",
    explanation: "Stock controllers are built for casual play and general compatibility — they don't account for the split-second advantage that competitive gaming rewards. Hair trigger locks eliminate the dead zone on triggers for faster shooting inputs. Remappable back paddles let you jump, reload, or crouch without lifting your thumbs off the sticks — the difference between a full-aim shot and a hip-fire.",
    lookFor: [
      "Hair trigger locks that shorten the trigger travel distance",
      "Back paddles or buttons for extra inputs without thumb movement",
      "Rechargeable battery — AA batteries add weight and die at bad times",
      "Official first-party or licensed compatibility to avoid input lag on PC",
    ],
    compareLabels: { row1: "Extra Buttons", row2: "Trigger Locks", row3: "Battery Type" },
  },

  networking: {
    headline: "Why you lag in online games and how to fix it for good",
    explanation: "In-game lag and disconnects have two sources: high ping (distance to server) and packet loss (data dropping in transit). Wi-Fi is the primary culprit for packet loss — the 2.4GHz and 5GHz bands are shared with neighbours' routers, microwaves, and Bluetooth devices, causing interference that drops packets. A single ethernet cable from your PC to the router eliminates this interference entirely. If ethernet isn't possible, Wi-Fi 6E's dedicated 6GHz band avoids the congestion.",
    lookFor: [
      "Wired ethernet connection as the first and most effective fix",
      "Wi-Fi 6E router if running cable is not possible",
      "QoS (Quality of Service) settings to prioritize gaming traffic",
      "Gaming VPN as a last resort for routing around ISP congestion",
    ],
    compareLabels: { row1: "Connection Type", row2: "Gaming QoS", row3: "Setup Difficulty" },
  },

  desk: {
    headline: "Why desk organization directly affects your performance",
    explanation: "A cluttered desk creates friction: cables catch your mouse, you hunt for items mid-game, and visual chaos raises background stress. A cable managed, organized desk with a full-coverage mousepad changes the sensory environment entirely — the mouse glides on a consistent surface, nothing interrupts your movement, and there is less cognitive load from disorder. Monitor arms are particularly high-impact because they free the largest surface on your desk in one move.",
    lookFor: [
      "Monitor arm to eliminate stand footprint and free desk space",
      "Extended desk mat (900x400mm minimum) for consistent mouse surface",
      "Cable management box to hide power strips and excess runs",
      "Cable clips or velcro straps to route and secure individual cables",
    ],
    compareLabels: { row1: "Coverage", row2: "Cable Management", row3: "Best For" },
  },

  "headset-comfort": {
    headline: "Why your headset causes ear pain and how to fix it",
    explanation: "Ear pain from headsets comes from two sources: clamping force and pad material. Clamping force is the pressure the headband exerts to hold the headset on your head — too much, and the cups press painfully against the tops of your ears. Leatherette ear pads seal well for audio but trap heat and sweat, creating discomfort after 1-2 hours. Velour pads breathe and reduce heat buildup significantly. Ultra-light headsets (under 200g) solve both problems.",
    lookFor: [
      "Weight under 200g — the lightest headsets disappear on your head",
      "Velour or breathable fabric ear pads to prevent heat buildup",
      "Steel headband with tension adjustment — not just padding",
      "Suspended headband design that distributes weight across the crown",
    ],
    compareLabels: { row1: "Weight", row2: "Ear Pad Material", row3: "Wireless" },
  },

  "budget-mouse": {
    headline: "Why your cheap mouse is holding you back (and the budget fix)",
    explanation: "Budget mice under $20 use optical sensors with low polling rates (125Hz) and high built-in acceleration — meaning the cursor moves inconsistently relative to your hand movement. For competitive play this feels like the cursor has a mind of its own. Between $30-50, you reach the threshold where brands like Logitech and Razer put their competition-grade HERO and Focus sensors — the same tracking performance as their $150 flagship mice, in a lower-feature shell.",
    lookFor: [
      "1000Hz polling rate — essential for responsive cursor tracking",
      "Named sensor (HERO, PMW3370, Focus Pro) — avoid generic optical",
      "Wireless preferred — removes cable drag that throws off fine adjustments",
      "Under 80g — lighter mice reduce fatigue during long sessions",
    ],
    compareLabels: { row1: "Sensor", row2: "Polling Rate", row3: "Wireless" },
  },
};

// Fallback for unknown categories
export const defaultAnalysis: CategoryAnalysis = {
  headline: "Finding the right gear for your problem",
  explanation: "The best gaming gear recommendation isn't about what is most expensive — it is about what is most appropriate for your specific problem. We match your issue to the products that directly address its root cause, rather than recommending the highest-reviewed product in a generic category.",
  lookFor: [
    "Products that address your specific problem directly",
    "Reputable brands with established customer support",
    "Good price-to-performance ratio for your use case",
    "Positive reviews from users with similar problems",
  ],
  compareLabels: { row1: "Price Range", row2: "Rating", row3: "Best For" },
};
