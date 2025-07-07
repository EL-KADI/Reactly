"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, ArrowRight, Home } from "lucide-react"
import Link from "next/link"

const scenarios = [
  {
    id: 1,
    title: "Stressed Colleague",
    description:
      "Your colleague Sarah seems visibly stressed after a team meeting. She's sitting at her desk with her head in her hands.",
    context: "It's been a challenging week with tight deadlines, and the meeting didn't go as planned.",
    reactions: [
      {
        id: "a",
        text: "Offer to help with her workload",
        weight: 9,
        feedback: "Excellent! Offering practical support shows empathy and builds trust.",
      },
      {
        id: "b",
        text: "Ignore her and focus on your own work",
        weight: 2,
        feedback: "This lacks empathy. Acknowledging others' struggles strengthens relationships.",
      },
      {
        id: "c",
        text: "Ask if she wants to talk about what's bothering her",
        weight: 8,
        feedback: "Great approach! Active listening and showing genuine concern demonstrates emotional intelligence.",
      },
      {
        id: "d",
        text: "Tell her everyone has bad days",
        weight: 4,
        feedback: "While well-intentioned, this minimizes her feelings. Try offering specific support instead.",
      },
    ],
  },
  {
    id: 2,
    title: "Disagreement with Friend",
    description: "Your friend Mike strongly disagrees with your opinion during a group discussion about weekend plans.",
    context: "The group is trying to decide between outdoor activities, and tensions are rising.",
    reactions: [
      {
        id: "a",
        text: "Argue back to prove your point",
        weight: 3,
        feedback: "This escalates conflict. Consider finding common ground instead.",
      },
      {
        id: "b",
        text: "Listen to his perspective and find a compromise",
        weight: 9,
        feedback: "Perfect! This shows maturity and collaborative problem-solving skills.",
      },
      {
        id: "c",
        text: "Stay silent and let others decide",
        weight: 5,
        feedback: "While avoiding conflict, this misses an opportunity to practice healthy disagreement.",
      },
      {
        id: "d",
        text: "Acknowledge his viewpoint before sharing yours",
        weight: 8,
        feedback: "Excellent! Validation before explanation builds understanding and respect.",
      },
    ],
  },
  {
    id: 3,
    title: "Team Member Taking Credit",
    description: "During a presentation, your teammate takes full credit for work you both contributed to equally.",
    context: "This is an important presentation to senior management, and recognition matters for career advancement.",
    reactions: [
      {
        id: "a",
        text: "Interrupt and correct them immediately",
        weight: 4,
        feedback: "While honest, this approach can damage relationships. Consider a more diplomatic response.",
      },
      {
        id: "b",
        text: "Address it privately after the meeting",
        weight: 8,
        feedback:
          "Good approach! Private conversations often resolve issues more effectively than public confrontations.",
      },
      {
        id: "c",
        text: "Let it slide to avoid conflict",
        weight: 3,
        feedback: "This may lead to repeated behavior. Setting boundaries respectfully is important.",
      },
      {
        id: "d",
        text: "Politely add your contributions when appropriate",
        weight: 9,
        feedback: "Excellent! This asserts yourself professionally while maintaining team harmony.",
      },
    ],
  },
  {
    id: 4,
    title: "Upset Customer",
    description: "A customer is visibly frustrated and raising their voice about a delayed order.",
    context:
      "The delay was due to supply chain issues beyond your direct control, but the customer is understandably upset.",
    reactions: [
      {
        id: "a",
        text: "Explain that it's not your fault",
        weight: 2,
        feedback: "This deflects responsibility. Focus on solutions and empathy instead.",
      },
      {
        id: "b",
        text: "Apologize sincerely and offer solutions",
        weight: 9,
        feedback: "Perfect! Taking ownership and focusing on resolution shows excellent customer service skills.",
      },
      {
        id: "c",
        text: "Ask them to calm down",
        weight: 3,
        feedback: "This can escalate the situation. Acknowledge their feelings first.",
      },
      {
        id: "d",
        text: "Listen actively and validate their frustration",
        weight: 8,
        feedback: "Great start! Validation helps de-escalate emotional situations effectively.",
      },
    ],
  },
  {
    id: 5,
    title: "Excluded from Group",
    description:
      "You notice a colleague, Alex, sitting alone during lunch while others are chatting in a group nearby.",
    context: "Alex is relatively new to the team and seems to struggle with social connections.",
    reactions: [
      {
        id: "a",
        text: "Invite Alex to join your lunch group",
        weight: 9,
        feedback: "Wonderful! Inclusive behavior creates a positive environment for everyone.",
      },
      {
        id: "b",
        text: "Assume Alex prefers to be alone",
        weight: 4,
        feedback: "While possible, reaching out shows care and might be appreciated.",
      },
      {
        id: "c",
        text: "Mention it to your manager",
        weight: 6,
        feedback: "This shows concern, but direct action might be more effective first.",
      },
      {
        id: "d",
        text: "Strike up a conversation with Alex",
        weight: 8,
        feedback: "Excellent! Personal connection can help someone feel more included and valued.",
      },
    ],
  },
  {
    id: 6,
    title: "Family Dinner Tension",
    description: "During a family dinner, your brother makes a comment that clearly upsets your sister.",
    context: "Family gatherings have been tense lately, and everyone seems on edge.",
    reactions: [
      {
        id: "a",
        text: "Change the subject immediately",
        weight: 6,
        feedback: "This avoids immediate conflict but doesn't address the underlying issue.",
      },
      {
        id: "b",
        text: "Ask your brother to apologize",
        weight: 5,
        feedback: "Direct but might escalate the situation. Consider a gentler approach.",
      },
      {
        id: "c",
        text: "Check in with your sister privately",
        weight: 8,
        feedback: "Thoughtful! Showing individual support while avoiding public confrontation.",
      },
      {
        id: "d",
        text: "Suggest everyone take a break",
        weight: 7,
        feedback: "Good de-escalation technique. Sometimes space helps emotions settle.",
      },
    ],
  },
  {
    id: 7,
    title: "Overwhelmed New Employee",
    description: "A new team member looks overwhelmed and confused during their first week.",
    context: "The onboarding process has been rushed due to urgent project deadlines.",
    reactions: [
      {
        id: "a",
        text: "Offer to mentor them through the basics",
        weight: 9,
        feedback: "Excellent leadership! Mentoring shows empathy and builds team strength.",
      },
      {
        id: "b",
        text: "Tell them it gets easier with time",
        weight: 4,
        feedback: "While reassuring, this doesn't provide immediate practical help.",
      },
      {
        id: "c",
        text: "Share your own first-week experiences",
        weight: 7,
        feedback: "Good connection-building, but combine this with practical support.",
      },
      {
        id: "d",
        text: "Ask what specific help they need",
        weight: 8,
        feedback: "Great approach! Understanding specific needs leads to more effective support.",
      },
    ],
  },
  {
    id: 8,
    title: "Friend's Relationship Problems",
    description: "Your close friend keeps complaining about their partner but gets defensive when you offer advice.",
    context: "This has been going on for months, and you're feeling frustrated with the cycle.",
    reactions: [
      {
        id: "a",
        text: "Stop giving advice and just listen",
        weight: 8,
        feedback: "Wise choice! Sometimes people need to be heard more than advised.",
      },
      {
        id: "b",
        text: "Tell them to stop complaining if they won't act",
        weight: 3,
        feedback: "This might damage the friendship. Try a more supportive approach.",
      },
      {
        id: "c",
        text: "Ask what kind of support they need from you",
        weight: 9,
        feedback: "Perfect! This clarifies expectations and shows respect for their autonomy.",
      },
      {
        id: "d",
        text: "Share similar experiences from your past",
        weight: 6,
        feedback: "Can be helpful but ensure it doesn't shift focus away from their needs.",
      },
    ],
  },
  {
    id: 9,
    title: "Micromanaging Boss",
    description: "Your manager constantly checks on your work and questions every decision you make.",
    context: "You've been in this role for over a year and feel your competence is being questioned.",
    reactions: [
      {
        id: "a",
        text: "Schedule a private meeting to discuss working styles",
        weight: 9,
        feedback: "Excellent! Professional communication about working relationships shows maturity.",
      },
      {
        id: "b",
        text: "Start copying them on every email to show transparency",
        weight: 6,
        feedback: "Proactive but might reinforce the micromanaging behavior.",
      },
      {
        id: "c",
        text: "Complain to HR about the situation",
        weight: 4,
        feedback: "Consider direct communication first before escalating to HR.",
      },
      {
        id: "d",
        text: "Ask for specific feedback on your performance",
        weight: 8,
        feedback: "Good approach! Understanding their concerns can help address the root issue.",
      },
    ],
  },
  {
    id: 10,
    title: "Child Having Tantrum",
    description: "A child in the grocery store is having a meltdown while their parent looks embarrassed and stressed.",
    context: "Other shoppers are staring and making comments, adding to the parent's distress.",
    reactions: [
      {
        id: "a",
        text: "Offer a kind smile to the parent",
        weight: 8,
        feedback: "Compassionate! A simple gesture of understanding can mean a lot to struggling parents.",
      },
      {
        id: "b",
        text: "Mind your own business and continue shopping",
        weight: 5,
        feedback: "Neutral approach, but a small act of kindness could make a difference.",
      },
      {
        id: "c",
        text: "Distract the child with a friendly wave",
        weight: 7,
        feedback: "Kind gesture, but be mindful that some parents prefer to handle it themselves.",
      },
      {
        id: "d",
        text: "Tell other shoppers to be more understanding",
        weight: 6,
        feedback: "Well-intentioned but might create more drama. Focus on supporting the parent directly.",
      },
    ],
  },
  {
    id: 11,
    title: "Roommate's Messy Habits",
    description: "Your roommate consistently leaves dishes in the sink and common areas messy.",
    context: "You've mentioned it casually before, but the behavior continues.",
    reactions: [
      {
        id: "a",
        text: "Have a calm, direct conversation about expectations",
        weight: 9,
        feedback: "Perfect! Clear communication about shared living standards is essential.",
      },
      {
        id: "b",
        text: "Start cleaning up after them without saying anything",
        weight: 4,
        feedback: "This avoids conflict but may enable the behavior and build resentment.",
      },
      {
        id: "c",
        text: "Leave passive-aggressive notes",
        weight: 2,
        feedback: "This often escalates tension. Direct communication is more effective.",
      },
      {
        id: "d",
        text: "Suggest creating a cleaning schedule together",
        weight: 8,
        feedback: "Great collaborative approach! Shared systems work better than individual expectations.",
      },
    ],
  },
  {
    id: 12,
    title: "Elderly Neighbor Struggling",
    description: "You notice your elderly neighbor having difficulty carrying groceries up the stairs.",
    context: "They seem proud and independent, but clearly need assistance.",
    reactions: [
      {
        id: "a",
        text: "Offer to help carry the groceries",
        weight: 8,
        feedback: "Kind and direct! Most people appreciate genuine offers of help.",
      },
      {
        id: "b",
        text: "Pretend not to notice to preserve their dignity",
        weight: 4,
        feedback: "While respectful of pride, offering help respectfully is usually appreciated.",
      },
      {
        id: "c",
        text: "Ask if they'd like help in a casual, non-pitying way",
        weight: 9,
        feedback: "Excellent! The tone and approach matter as much as the offer itself.",
      },
      {
        id: "d",
        text: "Call their family to express concern",
        weight: 5,
        feedback: "Shows care but bypasses the person's autonomy. Try direct help first.",
      },
    ],
  },
  {
    id: 13,
    title: "Group Project Conflict",
    description: "Two team members in your group project are arguing about the direction of the work.",
    context: "The deadline is approaching, and the conflict is preventing progress.",
    reactions: [
      {
        id: "a",
        text: "Suggest taking a break and reconvening later",
        weight: 7,
        feedback: "Good de-escalation, but ensure you address the core issues when you return.",
      },
      {
        id: "b",
        text: "Facilitate a discussion about each person's concerns",
        weight: 9,
        feedback: "Excellent mediation skills! Understanding root concerns leads to better solutions.",
      },
      {
        id: "c",
        text: "Take charge and make the decision yourself",
        weight: 5,
        feedback: "Decisive but doesn't address the underlying conflict or build team consensus.",
      },
      {
        id: "d",
        text: "Ask each person to present their case objectively",
        weight: 8,
        feedback: "Good structured approach! This helps move from emotion to logic.",
      },
    ],
  },
  {
    id: 14,
    title: "Social Media Misunderstanding",
    description: "A friend seems upset about something you posted on social media, though your intent was harmless.",
    context: "They've been giving you the cold shoulder, and you're not sure what you did wrong.",
    reactions: [
      {
        id: "a",
        text: "Reach out directly to ask what's wrong",
        weight: 9,
        feedback: "Perfect! Direct communication prevents misunderstandings from festering.",
      },
      {
        id: "b",
        text: "Wait for them to bring it up",
        weight: 4,
        feedback: "This might let the issue grow. Taking initiative shows you care about the relationship.",
      },
      {
        id: "c",
        text: "Delete the post and hope things improve",
        weight: 5,
        feedback: "Reactive but doesn't address the communication breakdown.",
      },
      {
        id: "d",
        text: "Ask mutual friends what they think happened",
        weight: 3,
        feedback: "This can create drama. Direct communication is more respectful and effective.",
      },
    ],
  },
  {
    id: 15,
    title: "Workplace Gossip",
    description: "Colleagues are gossiping about a coworker's personal life during lunch.",
    context: "The conversation is becoming mean-spirited and unprofessional.",
    reactions: [
      {
        id: "a",
        text: "Change the subject to something work-related",
        weight: 8,
        feedback: "Good redirection! This stops the gossip without being confrontational.",
      },
      {
        id: "b",
        text: "Join in to fit in with the group",
        weight: 2,
        feedback: "This compromises your integrity and can damage workplace relationships.",
      },
      {
        id: "c",
        text: "Politely excuse yourself from the conversation",
        weight: 7,
        feedback: "Maintains your integrity, though it doesn't actively stop the harmful behavior.",
      },
      {
        id: "d",
        text: "Gently remind everyone about respecting privacy",
        weight: 9,
        feedback: "Excellent! Taking a stand for respect while maintaining relationships.",
      },
    ],
  },
  {
    id: 16,
    title: "Friend's Bad Decision",
    description: "Your friend is about to make what you believe is a major mistake in their career.",
    context: "They seem excited about the decision, but you can see potential problems they're missing.",
    reactions: [
      {
        id: "a",
        text: "Share your concerns respectfully and let them decide",
        weight: 9,
        feedback: "Perfect balance! Good friends share honest perspectives while respecting autonomy.",
      },
      {
        id: "b",
        text: "Support their decision regardless of your doubts",
        weight: 6,
        feedback: "Loyal but might not be serving their best interests. Honest input can be valuable.",
      },
      {
        id: "c",
        text: "Try to convince them they're wrong",
        weight: 4,
        feedback: "This can damage the relationship. Share concerns but respect their right to choose.",
      },
      {
        id: "d",
        text: "Ask questions to help them think it through",
        weight: 8,
        feedback: "Great approach! Socratic questioning helps people discover insights themselves.",
      },
    ],
  },
  {
    id: 17,
    title: "Restaurant Service Issue",
    description: "Your food order is wrong for the third time, and you're getting frustrated with the server.",
    context: "The restaurant is busy, and the server seems overwhelmed and apologetic.",
    reactions: [
      {
        id: "a",
        text: "Remain calm and explain the issue clearly",
        weight: 9,
        feedback: "Excellent! Clear communication without hostility gets better results.",
      },
      {
        id: "b",
        text: "Demand to speak to the manager immediately",
        weight: 5,
        feedback: "Sometimes necessary, but try working with the server first.",
      },
      {
        id: "c",
        text: "Express your frustration but acknowledge they're busy",
        weight: 8,
        feedback: "Good balance of assertiveness and empathy for their situation.",
      },
      {
        id: "d",
        text: "Just accept the wrong order to avoid conflict",
        weight: 4,
        feedback: "While polite, you deserve what you paid for. Respectful assertiveness is appropriate.",
      },
    ],
  },
  {
    id: 18,
    title: "Child's Sports Game",
    description: "Your child's team is losing badly, and they're getting visibly upset on the field.",
    context: "Other parents are shouting instructions, and the atmosphere is tense.",
    reactions: [
      {
        id: "a",
        text: "Cheer positively for effort rather than results",
        weight: 9,
        feedback: "Excellent parenting! Focusing on effort builds resilience and self-worth.",
      },
      {
        id: "b",
        text: "Stay quiet to avoid adding pressure",
        weight: 6,
        feedback: "Considerate, but positive encouragement can be very supportive.",
      },
      {
        id: "c",
        text: "Shout tactical advice to help them improve",
        weight: 4,
        feedback: "Well-intentioned but can add pressure. Leave coaching to the coach.",
      },
      {
        id: "d",
        text: "Focus on praising good sportsmanship",
        weight: 8,
        feedback: "Great values-based approach! This teaches important life lessons beyond winning.",
      },
    ],
  },
  {
    id: 19,
    title: "Public Transportation Conflict",
    description: "Someone on the bus is playing music loudly without headphones, disturbing other passengers.",
    context: "Several people look annoyed, but no one is saying anything.",
    reactions: [
      {
        id: "a",
        text: "Politely ask them to use headphones",
        weight: 8,
        feedback: "Good assertiveness! Polite requests often work better than confrontation.",
      },
      {
        id: "b",
        text: "Move to a different seat if possible",
        weight: 6,
        feedback: "Avoids conflict but doesn't address the issue affecting everyone.",
      },
      {
        id: "c",
        text: "Give them disapproving looks",
        weight: 3,
        feedback: "Passive-aggressive and unlikely to be effective. Direct communication is better.",
      },
      {
        id: "d",
        text: "Ask the bus driver to intervene",
        weight: 7,
        feedback: "Reasonable approach if direct communication seems unsafe or ineffective.",
      },
    ],
  },
  {
    id: 20,
    title: "Workplace Deadline Pressure",
    description: "Your team is behind on a critical project, and everyone is stressed and working overtime.",
    context: "Tempers are short, and team morale is low.",
    reactions: [
      {
        id: "a",
        text: "Suggest a brief team meeting to reassess priorities",
        weight: 8,
        feedback: "Good leadership! Sometimes stepping back helps find more efficient approaches.",
      },
      {
        id: "b",
        text: "Bring coffee and snacks for the team",
        weight: 7,
        feedback: "Thoughtful gesture that can boost morale during stressful times.",
      },
      {
        id: "c",
        text: "Work harder and encourage others to do the same",
        weight: 5,
        feedback: "Shows dedication but doesn't address the systemic issues causing stress.",
      },
      {
        id: "d",
        text: "Acknowledge the stress and ask how you can help",
        weight: 9,
        feedback: "Excellent! Emotional acknowledgment plus practical support is ideal leadership.",
      },
    ],
  },
  {
    id: 21,
    title: "Friend's Financial Struggles",
    description: "A close friend hints that they're having serious financial difficulties.",
    context: "They seem embarrassed and haven't directly asked for help.",
    reactions: [
      {
        id: "a",
        text: "Offer to lend them money directly",
        weight: 6,
        feedback: "Generous but might make them uncomfortable. Consider more subtle approaches first.",
      },
      {
        id: "b",
        text: "Ask if there's any way you can support them",
        weight: 9,
        feedback: "Perfect! This opens the door for them to share what kind of help they need.",
      },
      {
        id: "c",
        text: "Pretend you didn't notice to preserve their dignity",
        weight: 4,
        feedback: "While respectful, offering support in a caring way is usually appreciated.",
      },
      {
        id: "d",
        text: "Share resources about financial assistance programs",
        weight: 8,
        feedback: "Helpful and practical! Providing information respects their autonomy.",
      },
    ],
  },
  {
    id: 22,
    title: "Neighbor's Loud Party",
    description: "Your neighbor is having a loud party on a weeknight, and it's keeping you awake.",
    context: "You have an important meeting early tomorrow morning.",
    reactions: [
      {
        id: "a",
        text: "Go over and politely ask them to keep it down",
        weight: 8,
        feedback: "Direct and respectful approach. Most reasonable people will cooperate.",
      },
      {
        id: "b",
        text: "Call the police or building management",
        weight: 5,
        feedback: "Sometimes necessary, but try direct communication first.",
      },
      {
        id: "c",
        text: "Suffer in silence to avoid confrontation",
        weight: 3,
        feedback: "You have a right to reasonable quiet. Polite assertiveness is appropriate.",
      },
      {
        id: "d",
        text: "Send a friendly text if you have their number",
        weight: 9,
        feedback: "Excellent! Less confrontational than knocking, and gives them a chance to respond positively.",
      },
    ],
  },
  {
    id: 23,
    title: "Teenage Mood Swings",
    description: "Your teenager comes home from school in a terrible mood and snaps at everyone.",
    context: "This has been happening frequently, and family dinners are becoming tense.",
    reactions: [
      {
        id: "a",
        text: "Give them space and check in later when they're calmer",
        weight: 8,
        feedback: "Wise approach! Timing matters when dealing with strong emotions.",
      },
      {
        id: "b",
        text: "Immediately address their disrespectful behavior",
        weight: 5,
        feedback: "Boundaries are important, but consider their emotional state and timing.",
      },
      {
        id: "c",
        text: "Ask what's wrong and if you can help",
        weight: 7,
        feedback: "Caring, but they might not be ready to talk when emotions are high.",
      },
      {
        id: "d",
        text: "Acknowledge their feelings while setting boundaries",
        weight: 9,
        feedback: "Perfect balance! Validation plus clear expectations about respectful communication.",
      },
    ],
  },
  {
    id: 24,
    title: "Workplace Discrimination Witness",
    description: "You witness a colleague making inappropriate comments about someone's race during a meeting.",
    context: "The targeted person looks uncomfortable, but the meeting continues.",
    reactions: [
      {
        id: "a",
        text: "Speak up immediately to address the comment",
        weight: 8,
        feedback: "Courageous! Standing up against discrimination in the moment is important.",
      },
      {
        id: "b",
        text: "Check in privately with the affected person afterward",
        weight: 7,
        feedback: "Supportive, but consider also addressing the behavior directly.",
      },
      {
        id: "c",
        text: "Report the incident to HR",
        weight: 8,
        feedback: "Important for documentation, especially if direct intervention isn't safe or effective.",
      },
      {
        id: "d",
        text: "Do both - address it in the moment and follow up officially",
        weight: 9,
        feedback: "Excellent comprehensive response! Immediate action plus proper reporting.",
      },
    ],
  },
  {
    id: 25,
    title: "Friend's Addiction Concerns",
    description: "You're worried that a close friend might be developing a drinking problem.",
    context: "Their behavior has changed, and they're making concerning choices.",
    reactions: [
      {
        id: "a",
        text: "Express your concerns directly but lovingly",
        weight: 9,
        feedback: "Excellent! Honest, caring communication is crucial for people we care about.",
      },
      {
        id: "b",
        text: "Research addiction resources to share with them",
        weight: 8,
        feedback: "Helpful preparation, but combine this with direct conversation.",
      },
      {
        id: "c",
        text: "Wait and see if the problem gets worse",
        weight: 3,
        feedback: "Early intervention is more effective. Don't wait for rock bottom.",
      },
      {
        id: "d",
        text: "Talk to their family members about your concerns",
        weight: 6,
        feedback: "Can be helpful, but try talking to your friend directly first.",
      },
    ],
  },
  {
    id: 26,
    title: "Elderly Parent's Independence",
    description: "Your aging parent is struggling with daily tasks but insists they don't need help.",
    context: "You're worried about their safety, but they value their independence highly.",
    reactions: [
      {
        id: "a",
        text: "Respect their wishes and check in more frequently",
        weight: 7,
        feedback: "Balances respect for autonomy with increased monitoring.",
      },
      {
        id: "b",
        text: "Have an honest conversation about your concerns",
        weight: 9,
        feedback: "Perfect! Open communication about safety concerns while respecting their dignity.",
      },
      {
        id: "c",
        text: "Arrange help without telling them",
        weight: 4,
        feedback: "This undermines their autonomy. Include them in decisions about their care.",
      },
      {
        id: "d",
        text: "Suggest starting with small amounts of help",
        weight: 8,
        feedback: "Good compromise approach! Gradual changes are often more acceptable.",
      },
    ],
  },
  {
    id: 27,
    title: "Online Gaming Toxicity",
    description: "During an online game, other players are being verbally abusive to a teammate.",
    context: "The targeted player sounds young and is getting increasingly upset.",
    reactions: [
      {
        id: "a",
        text: "Defend the targeted player and call out the behavior",
        weight: 9,
        feedback: "Excellent! Standing up against online bullying creates a better community.",
      },
      {
        id: "b",
        text: "Mute the toxic players and continue playing",
        weight: 5,
        feedback: "Protects your own experience but doesn't help the victim or address the problem.",
      },
      {
        id: "c",
        text: "Send a private supportive message to the targeted player",
        weight: 8,
        feedback: "Kind and supportive! Personal connection can really help someone being bullied.",
      },
      {
        id: "d",
        text: "Report the toxic players to game moderators",
        weight: 7,
        feedback: "Important for consequences, but immediate support for the victim is also needed.",
      },
    ],
  },
  {
    id: 28,
    title: "Wedding Planning Stress",
    description: "Your friend is extremely stressed about wedding planning and taking it out on everyone around them.",
    context: "They've become demanding and unreasonable, straining friendships.",
    reactions: [
      {
        id: "a",
        text: "Gently point out how their stress is affecting relationships",
        weight: 8,
        feedback: "Honest feedback from a friend can provide important perspective.",
      },
      {
        id: "b",
        text: "Offer specific help with wedding tasks",
        weight: 9,
        feedback: "Perfect! Practical support addresses the root cause of their stress.",
      },
      {
        id: "c",
        text: "Distance yourself until after the wedding",
        weight: 4,
        feedback: "While self-protective, good friends help each other through difficult times.",
      },
      {
        id: "d",
        text: "Suggest they consider hiring a wedding planner",
        weight: 7,
        feedback: "Practical advice that could reduce their stress significantly.",
      },
    ],
  },
  {
    id: 29,
    title: "Classroom Bullying",
    description: "You notice a student being consistently excluded and mocked by classmates.",
    context: "The teacher doesn't seem to notice, and the bullying is getting worse.",
    reactions: [
      {
        id: "a",
        text: "Include the isolated student in your group activities",
        weight: 9,
        feedback: "Excellent! Direct inclusion is one of the most powerful anti-bullying actions.",
      },
      {
        id: "b",
        text: "Report the bullying to the teacher or administration",
        weight: 8,
        feedback: "Important for systemic change, especially when combined with direct support.",
      },
      {
        id: "c",
        text: "Confront the bullies directly",
        weight: 6,
        feedback: "Brave but might escalate the situation. Consider safer approaches first.",
      },
      {
        id: "d",
        text: "Encourage the victim to stand up for themselves",
        weight: 5,
        feedback: "Well-intentioned but puts responsibility on the victim. Better to offer direct support.",
      },
    ],
  },
  {
    id: 30,
    title: "Community Volunteer Conflict",
    description: "Two volunteers at your community organization have very different ideas about how to run an event.",
    context: "The disagreement is creating tension and affecting other volunteers' enthusiasm.",
    reactions: [
      {
        id: "a",
        text: "Suggest they present both ideas to the group for discussion",
        weight: 8,
        feedback: "Democratic approach that involves everyone in the decision-making process.",
      },
      {
        id: "b",
        text: "Propose combining elements from both ideas",
        weight: 9,
        feedback: "Excellent collaborative solution! This often leads to better outcomes than either original idea.",
      },
      {
        id: "c",
        text: "Stay out of it and let them work it out",
        weight: 4,
        feedback: "While non-confrontational, your mediation could help preserve team harmony.",
      },
      {
        id: "d",
        text: "Ask the organization leader to make the final decision",
        weight: 6,
        feedback: "Sometimes necessary, but try collaborative solutions first.",
      },
    ],
  },
]

export default function TrainingPage() {
  const router = useRouter()
  const [currentScenario, setCurrentScenario] = useState(0)
  const [selectedReaction, setSelectedReaction] = useState("")
  const [showFeedback, setShowFeedback] = useState(false)
  const [responses, setResponses] = useState<any[]>([])
  const [sessionStarted, setSessionStarted] = useState(false)

  const handleReactionSelect = (reactionId: string) => {
    setSelectedReaction(reactionId)
  }

  const handleSubmitReaction = () => {
    if (!selectedReaction) {
      alert("Please select a reaction before proceeding.")
      return
    }

    const scenario = scenarios[currentScenario]
    const reaction = scenario.reactions.find((r) => r.id === selectedReaction)

    if (reaction) {
      const newResponse = {
        scenarioId: scenario.id,
        reactionId: selectedReaction,
        weight: reaction.weight,
        feedback: reaction.feedback,
      }

      setResponses([...responses, newResponse])
      setShowFeedback(true)
    }
  }

  const handleNextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1)
      setSelectedReaction("")
      setShowFeedback(false)
    } else {
      const totalScore = Math.round(
        ((responses.reduce((sum, r) => sum + r.weight, 0) +
          scenarios[currentScenario].reactions.find((r) => r.id === selectedReaction)?.weight || 0) /
          scenarios.length) *
          10,
      )

      const result = {
        id: Date.now(),
        date: new Date().toISOString(),
        score: totalScore,
        scenariosCompleted: scenarios.length,
        responses: [
          ...responses,
          {
            scenarioId: scenarios[currentScenario].id,
            reactionId: selectedReaction,
            weight: scenarios[currentScenario].reactions.find((r) => r.id === selectedReaction)?.weight || 0,
            feedback: scenarios[currentScenario].reactions.find((r) => r.id === selectedReaction)?.feedback || "",
          },
        ],
        analysis: generateAnalysis(totalScore),
      }

      const existingResults = JSON.parse(localStorage.getItem("reactly-results") || "[]")
      localStorage.setItem("reactly-results", JSON.stringify([...existingResults, result]))

      router.push(`/results/${result.id}`)
    }
  }

  const generateAnalysis = (score: number) => {
    if (score >= 85) {
      return {
        level: "Excellent",
        strengths: ["Strong empathy", "Excellent communication", "Great conflict resolution", "Outstanding leadership"],
        improvements: [
          "Continue practicing active listening",
          "Mentor others in EQ development",
          "Explore advanced emotional intelligence concepts",
        ],
        description:
          "You demonstrate exceptional emotional intelligence with strong empathy and communication skills across diverse situations.",
      }
    } else if (score >= 70) {
      return {
        level: "Good",
        strengths: ["Good empathy", "Solid communication", "Decent conflict handling", "Shows emotional awareness"],
        improvements: [
          "Practice more active listening",
          "Work on reading non-verbal cues",
          "Develop stronger boundary-setting skills",
        ],
        description:
          "You have good emotional intelligence with room for growth in specific areas. You handle most social situations well.",
      }
    } else if (score >= 55) {
      return {
        level: "Developing",
        strengths: ["Shows awareness", "Willing to help others", "Demonstrates care for relationships"],
        improvements: [
          "Focus on empathy building",
          "Practice perspective-taking",
          "Improve communication skills",
          "Learn conflict resolution techniques",
        ],
        description:
          "You're developing emotional intelligence skills and show potential for significant growth with focused practice.",
      }
    } else {
      return {
        level: "Needs Development",
        strengths: ["Honest self-assessment", "Opportunity for growth", "Willingness to learn"],
        improvements: [
          "Focus on understanding others' emotions",
          "Practice empathy daily",
          "Learn active listening techniques",
          "Study conflict resolution strategies",
          "Work on emotional self-regulation",
        ],
        description:
          "There's significant opportunity to develop your emotional intelligence through focused practice and learning.",
      }
    }
  }

  const progress = ((currentScenario + (showFeedback ? 1 : 0)) / scenarios.length) * 100

  if (!sessionStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-2xl mx-auto animate-zoom-in">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Ready to Start Your EQ Training?</CardTitle>
            <CardDescription className="text-lg">
              You'll be presented with {scenarios.length} realistic social scenarios. Choose the best reaction and
              receive immediate feedback.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="font-semibold">Scenarios</div>
                <div className="text-2xl font-bold text-blue-600">{scenarios.length}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="font-semibold">Estimated Time</div>
                <div className="text-2xl font-bold text-green-600">15-25 min</div>
              </div>
            </div>
            <Button onClick={() => setSessionStarted(true)} size="lg" className="w-full">
              Begin Training Session
            </Button>
            <Link href="/">
              <Button variant="outline" className="w-full bg-transparent">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const scenario = scenarios[currentScenario]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Scenario {currentScenario + 1} of {scenarios.length}
            </span>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl">{scenario.title}</CardTitle>
            <CardDescription className="text-base">{scenario.context}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <p className="text-lg font-medium text-gray-800">{scenario.description}</p>
            </div>

            {!showFeedback ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">How would you react?</h3>
                <RadioGroup value={selectedReaction} onValueChange={handleReactionSelect}>
                  {scenario.reactions.map((reaction, index) => (
                    <div
                      key={reaction.id}
                      className={`flex items-start space-x-3 p-4 rounded-lg border transition-all duration-200 hover:bg-gray-50 ${
                        selectedReaction === reaction.id ? "bg-blue-50 border-blue-300" : "border-gray-200"
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <RadioGroupItem value={reaction.id} id={reaction.id} className="mt-1" />
                      <Label htmlFor={reaction.id} className="flex-1 cursor-pointer text-base leading-relaxed">
                        {reaction.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                <Button onClick={handleSubmitReaction} disabled={!selectedReaction} className="w-full" size="lg">
                  Submit Response
                </Button>
              </div>
            ) : (
              <div className="space-y-4 animate-slide-in">
                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-green-800 mb-2">Feedback</h3>
                      <p className="text-green-700">
                        {scenario.reactions.find((r) => r.id === selectedReaction)?.feedback}
                      </p>
                    </div>
                  </div>
                </div>
                <Button onClick={handleNextScenario} className="w-full" size="lg">
                  {currentScenario < scenarios.length - 1 ? (
                    <>
                      Next Scenario
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    "View Results"
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
