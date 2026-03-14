// Chat Engine — Grill Staff Assistant
// Pattern-matching response generator for the interactive demo

import {
  rooms, guests, upcomingGuests, reservations,
  serviceRequests, staff, restaurants, hotelPolicies,
} from './hotel-data';

const allGuests = [...guests, ...upcomingGuests];

function findGuestByName(query) {
  const q = query.toLowerCase();
  return allGuests.find(
    (g) =>
      g.firstName.toLowerCase().includes(q) ||
      g.lastName.toLowerCase().includes(q) ||
      `${g.firstName} ${g.lastName}`.toLowerCase().includes(q)
  );
}

function getGuestRoom(guestId) {
  return rooms.find((r) => r.currentGuest === guestId);
}

function getTomorrowArrivals() {
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  return reservations.filter((r) => r.checkIn === tomorrow);
}

function getPreArrivalIncomplete() {
  return reservations.filter((r) => !r.preArrivalComplete && r.status === 'confirmed');
}

export function generateResponse(userMessage) {
  const msg = userMessage.toLowerCase().trim();
  let content = '';
  let dataSources = [];

  // ---- DAILY BRIEFING ----
  if (msg.includes('briefing') || msg.includes('morning') || msg.includes('good morning') || msg.includes('today') || msg.includes("what's happening") || msg.includes('summary')) {
    const occupied = rooms.filter((r) => r.status === 'occupied').length;
    const pending = serviceRequests.filter((s) => s.status === 'pending');
    const tomorrowArrivals = getTomorrowArrivals();
    const incomplete = getPreArrivalIncomplete();

    content = `## Good morning, team

**${occupied} of ${rooms.length} rooms** occupied today. Here's what matters:

### What's special today
- **Marie Dubois** (The Lucho) — Birthday is coming up. Cake surprise requested. **Confirm with kitchen today.**
- **Carlos Mendoza** (The Helen) — Checking out. Airport transfer at 3pm. He mentioned interest in a **15-person company event** — worth a follow-up before he leaves.
- **Isabella & Marco** (The María) — Honeymoon couple. Dinner at Andrés Carne de Res on Saturday — remind them to leave by 5pm for the drive.

### Pending tasks
${pending.map((s) => {
  const g = allGuests.find((guest) => guest.id === s.guestId);
  return `- ${g?.firstName}: ${s.description}`;
}).join('\n')}

### Tomorrow
${tomorrowArrivals.length > 0
  ? tomorrowArrivals.map((r) => {
      const g = allGuests.find((guest) => guest.id === r.guestId);
      return `- **${g?.firstName} ${g?.lastName}** arriving — ${r.preArrivalComplete ? 'profile ready' : '⚠ profile incomplete, needs outreach'}`;
    }).join('\n')
  : 'No arrivals tomorrow.'}
${incomplete.length > 0 ? `\n**Camila:** ${incomplete.length} guest(s) still need pre-arrival outreach.` : ''}

### Weather
22°C today, pleasant morning, likely afternoon rain. **Remind guests to carry an umbrella** if heading out after lunch.`;
    dataSources = ['Opera PMS', 'Guest Profiles', 'Service Requests'];
  }

  // ---- MICRO-OBSERVATION / NOTE LOGGING ----
  else if (msg.includes('loved') || msg.includes('liked') || msg.includes('enjoyed') || msg.includes('hated') || msg.includes("didn't like") || msg.includes('left half') || msg.includes('complained') || msg.includes('prefers') || msg.includes('wants') || msg.includes('asked for') || msg.includes('mentioned') || msg.includes('note:') || msg.includes('record')) {
    let guest;
    const words = userMessage.split(/\s+/);
    for (const word of words) {
      if (word.length > 2) {
        guest = findGuestByName(word);
        if (guest) break;
      }
    }

    if (guest) {
      content = `**Noted for ${guest.firstName} ${guest.lastName}.**\n\nI've saved this to their profile. Here's what this means:\n\n`;
      if (msg.includes('loved') || msg.includes('liked') || msg.includes('enjoyed')) {
        content += `- This will be remembered for future visits and recommendations\n`;
        content += `- If ${guest.firstName} returns, any staff member will see this preference\n`;
        if (msg.includes('restaurant') || msg.includes('dinner') || msg.includes('lunch')) {
          content += `- I'll avoid recommending this place again and suggest similar options next time\n`;
        }
      }
      if (msg.includes('left half') || msg.includes("didn't finish") || msg.includes('too much')) {
        content += `- I'll flag smaller portions for ${guest.firstName} going forward\n`;
        content += `- Kitchen team will see this note at breakfast prep\n`;
      }
      if (msg.includes('complained') || msg.includes("didn't like") || msg.includes('hated')) {
        content += `- This is flagged as something to avoid for ${guest.firstName}\n`;
        content += `- If it's a service issue, consider following up personally today\n`;
      }
      if (msg.includes('mentioned') || msg.includes('asked for') || msg.includes('wants')) {
        content += `- This is saved as an open request — make sure someone follows up\n`;
      }
      content += `\n*Synced to guest profile database — visible to all staff instantly.*`;
      dataSources = ['Guest Profiles'];
    } else {
      content = `I'll save that note. Which guest is this about? Current guests:\n\n${guests.filter(g => rooms.some(r => r.currentGuest === g.id)).map((g) => `- **${g.firstName} ${g.lastName}** (${getGuestRoom(g.id)?.name})`).join('\n')}`;
      dataSources = ['Guest Profiles'];
    }
  }

  // ---- GUEST LOOKUP ----
  else if (msg.includes('who is') || msg.includes('tell me about') || msg.includes('profile') || msg.includes('preference') || msg.includes('guest')) {
    const words = userMessage.split(/\s+/);
    let guest;
    for (let i = 0; i < words.length; i++) {
      if (words[i].length > 2) {
        guest = findGuestByName(words[i]);
        if (guest) break;
      }
      if (i < words.length - 1) {
        guest = findGuestByName(`${words[i]} ${words[i + 1]}`);
        if (guest) break;
      }
    }

    if (guest) {
      const room = getGuestRoom(guest.id);
      const res = reservations.find((r) => r.guestId === guest.id);
      const guestServices = serviceRequests.filter((s) => s.guestId === guest.id);

      content = `## ${guest.firstName} ${guest.lastName}\n\n`;
      content += `**${guest.nationality}** · speaks ${guest.language} · ${guest.visitCount > 1 ? `visit #${guest.visitCount}` : 'first visit'} · prefers ${guest.communicationPreference}\n`;
      if (room) content += `**Room:** ${room.name} (${room.type}, floor ${room.floor})\n`;
      if (res) content += `**Stay:** ${res.checkIn} → ${res.checkOut} · booked via ${res.source}\n`;
      if (guest.tags.length > 0) content += `**Tags:** ${guest.tags.map(t => `\`${t}\``).join(' ')}\n`;

      content += `\n### The Grill\n`;
      if (guest.grill.celebrationPurpose) content += `- **Why they're here:** ${guest.grill.celebrationPurpose}\n`;
      if (guest.grill.dietaryRestrictions?.length) content += `- **Dietary:** ${guest.grill.dietaryRestrictions.join(', ')}\n`;
      if (guest.grill.interests?.length) content += `- **Interests:** ${guest.grill.interests.join(', ')}\n`;
      if (guest.grill.preferredRestaurants?.length) content += `- **Restaurants they've loved:** ${guest.grill.preferredRestaurants.join(', ')}\n`;
      if (guest.grill.dislikes?.length) content += `- **Avoid:** ${guest.grill.dislikes.join(', ')}\n`;
      if (guest.grill.childrenInfo) content += `- **Family:** ${guest.grill.childrenInfo}\n`;

      if (guest.grill.notes.length > 0) {
        content += `\n### Staff notes\n`;
        guest.grill.notes.forEach((n) => (content += `- ${n}\n`));
      }

      if (guestServices.length > 0) {
        content += `\n### Today's activity\n`;
        guestServices.forEach((s) => {
          content += `- **${s.type}:** ${s.description} (${s.status})\n`;
        });
      }

      if (guest.visitCount > 1) {
        content += `\n### Returning guest insight\n`;
        content += `${guest.firstName} has been here ${guest.visitCount} times (lifetime value: $${guest.lifetimeValue}). `;
        content += `Last visit: ${guest.lastVisit}. Any staff member can reference this history to make them feel remembered.`;
      }
      dataSources = ['Guest Profiles', 'Opera PMS'];
    } else {
      content = `Which guest? Here's who's at the hotel right now:\n\n${guests.filter(g => rooms.some(r => r.currentGuest === g.id)).map((g) => {
        const room = getGuestRoom(g.id);
        return `- **${g.firstName} ${g.lastName}** — ${room?.name} (${g.nationality}, ${g.grill.celebrationPurpose || 'leisure'})`;
      }).join('\n')}\n\n**Arriving soon:**\n${upcomingGuests.map((g) => `- **${g.firstName} ${g.lastName}** (${g.nationality})`).join('\n')}`;
      dataSources = ['Guest Profiles'];
    }
  }

  // ---- RESTAURANT RECOMMENDATIONS ----
  else if (msg.includes('restaurant') || msg.includes('recommend') || msg.includes('dinner') || msg.includes('lunch') || msg.includes('eat') || msg.includes('where should')) {
    let guest;
    const words = userMessage.split(/\s+/);
    for (const word of words) {
      if (word.length > 2) {
        guest = findGuestByName(word);
        if (guest) break;
      }
    }

    if (guest) {
      const visited = guest.grill.preferredRestaurants || [];
      const dietary = guest.grill.dietaryRestrictions || [];
      const dislikes = guest.grill.dislikes || [];
      const available = restaurants.filter(
        (r) => !visited.map(v => v.toLowerCase()).includes(r.name.toLowerCase())
      );

      content = `## Recommendations for ${guest.firstName}\n\n`;
      if (dietary.length > 0) content += `**Dietary:** ${dietary.join(', ')}\n`;
      if (visited.length > 0) content += `**Already been to:** ${visited.join(', ')}\n`;
      if (dislikes.length > 0) content += `**Avoid:** ${dislikes.join(', ')}\n\n`;

      content += `### Suggestions (they haven't tried yet)\n`;
      available.slice(0, 4).forEach((r) => {
        content += `- **${r.name}** — ${r.cuisine} (${r.priceRange}), ${r.walkingMin} min walk\n  ${r.note}\n`;
      });
      content += `\n*When ${guest.firstName} goes, just tell me how it went and I'll remember for next time.*`;
    } else {
      content = `## Local restaurants\n\n`;
      restaurants.forEach((r) => {
        content += `- **${r.name}** — ${r.cuisine} (${r.priceRange}) · ${r.walkingMin} min walk\n`;
      });
      content += `\nTip: Ask me "recommendations for [guest name]" and I'll filter based on their dietary needs and what they've already tried.`;
    }
    dataSources = ['Guest Profiles', 'Local Knowledge'];
  }

  // ---- OCCUPANCY ----
  else if (msg.includes('occupancy') || (msg.includes('how many') && msg.includes('room'))) {
    const occupied = rooms.filter((r) => r.status === 'occupied').length;
    const available = rooms.filter((r) => r.status === 'available').length;
    const maintenance = rooms.filter((r) => r.status === 'maintenance').length;

    content = `**${occupied} of ${rooms.length} rooms** occupied (${Math.round((occupied / rooms.length) * 100)}%)\n\n`;
    content += `**Available now:** ${rooms.filter((r) => r.status === 'available').map((r) => `${r.name} (${r.type})`).join(', ')}\n\n`;
    if (maintenance > 0) content += `**Maintenance:** ${rooms.filter((r) => r.status === 'maintenance').map((r) => r.name).join(', ')}\n`;
    dataSources = ['Opera PMS'];
  }

  // ---- TOMORROW'S ARRIVALS ----
  else if (msg.includes('tomorrow') || msg.includes('arriving') || msg.includes('check-in') || msg.includes('checkin') || msg.includes('arrival')) {
    const arrivals = getTomorrowArrivals();
    if (arrivals.length === 0) {
      content = 'No arrivals scheduled for tomorrow.';
    } else {
      content = `## Tomorrow's arrivals\n\n`;
      arrivals.forEach((r) => {
        const g = allGuests.find((guest) => guest.id === r.guestId);
        const room = rooms.find((rm) => rm.id === r.roomId);
        if (g && room) {
          content += `### ${g.firstName} ${g.lastName} → ${room.name}\n`;
          content += `${g.nationality} · ${g.language} · via ${r.source}\n`;
          content += `Pre-arrival: ${r.preArrivalComplete ? 'Ready' : '**Incomplete** — needs outreach today'}\n`;
          if (g.grill.notes.length > 0) {
            content += `Notes: ${g.grill.notes.join('; ')}\n`;
          }
          if (r.specialRequests.length > 0) {
            content += `Requests: ${r.specialRequests.join(', ')}\n`;
          }
          content += '\n';
        }
      });
    }
    dataSources = ['Opera PMS', 'Guest Profiles'];
  }

  // ---- PENDING SERVICES ----
  else if (msg.includes('pending') || msg.includes('service') || msg.includes('request') || msg.includes('tasks') || msg.includes('to do') || msg.includes('todo')) {
    const pending = serviceRequests.filter((s) => s.status === 'pending');
    const inProgress = serviceRequests.filter((s) => s.status === 'in-progress');

    if (pending.length === 0 && inProgress.length === 0) {
      content = 'All clear — no pending service requests right now.';
    } else {
      content = '';
      if (pending.length > 0) {
        content += `### Pending (${pending.length})\n`;
        pending.forEach((s) => {
          const g = allGuests.find((guest) => guest.id === s.guestId);
          const room = rooms.find((r) => r.id === s.roomId);
          content += `- **${g?.firstName}** (${room?.name}) — ${s.description}`;
          if (s.notes) content += ` · *${s.notes}*`;
          content += '\n';
        });
      }
      if (inProgress.length > 0) {
        content += `\n### In progress (${inProgress.length})\n`;
        inProgress.forEach((s) => {
          const g = allGuests.find((guest) => guest.id === s.guestId);
          content += `- **${g?.firstName}** — ${s.description} (${s.assignedTo})\n`;
        });
      }
    }
    dataSources = ['Service Requests'];
  }

  // ---- PRE-ARRIVAL ----
  else if (msg.includes('pre-arrival') || msg.includes('pre arrival') || msg.includes('incomplete') || msg.includes('camila') || msg.includes('outreach')) {
    const incomplete = getPreArrivalIncomplete();
    if (incomplete.length === 0) {
      content = 'All upcoming guests have complete profiles. Great work!';
    } else {
      content = `## Pre-arrival outreach needed\n\n${incomplete.length} guest(s) arriving soon without complete profiles:\n\n`;
      incomplete.forEach((r) => {
        const g = allGuests.find((guest) => guest.id === r.guestId);
        const room = rooms.find((rm) => rm.id === r.roomId);
        content += `### ${g?.firstName} ${g?.lastName}\n`;
        content += `Arriving ${r.checkIn} → ${room?.name} · via ${r.source}\n`;
        content += `**Missing:** celebration purpose, dietary info, interests\n\n`;
        content += `**Suggested message:** "Hi ${g?.firstName}! We're so looking forward to welcoming you on ${r.checkIn}! I'd love to know a bit about you so we can make your stay special..."\n\n`;
      });
      content += `\nAfter you chat with them, just tell me what you learned and I'll save it to their profile.`;
    }
    dataSources = ['Opera PMS', 'Guest Profiles'];
  }

  // ---- DIETARY / ALLERGIES ----
  else if (msg.includes('diet') || msg.includes('allerg') || msg.includes('restriction') || msg.includes('food')) {
    const guestsWithDietary = guests.filter(g =>
      rooms.some(r => r.currentGuest === g.id) &&
      g.grill.dietaryRestrictions?.length > 0
    );

    content = `## Dietary restrictions for current guests\n\n`;
    if (guestsWithDietary.length === 0) {
      content += 'No dietary restrictions on file for current guests.';
    } else {
      guestsWithDietary.forEach((g) => {
        const room = getGuestRoom(g.id);
        content += `- **${g.firstName} ${g.lastName}** (${room?.name}) — ${g.grill.dietaryRestrictions.join(', ')}\n`;
      });
      content += `\n**Kitchen team:** Please keep these visible during meal prep.`;
    }
    dataSources = ['Guest Profiles'];
  }

  // ---- STAFF ----
  else if (msg.includes('staff') || msg.includes('who is working') || msg.includes('team') || msg.includes('on duty')) {
    content = `### On duty today\n\n`;
    ['morning', 'afternoon', 'night'].forEach((shift) => {
      const onShift = staff.filter((s) => s.shift === shift);
      if (onShift.length > 0) {
        content += `**${shift.charAt(0).toUpperCase() + shift.slice(1)}:** `;
        content += onShift.map((s) => `${s.name} (${s.role})`).join(', ');
        content += '\n';
      }
    });
    dataSources = ['Staff Schedule'];
  }

  // ---- POLICIES ----
  else if (msg.includes('check-in') || msg.includes('checkout') || msg.includes('wifi') || msg.includes('breakfast') || msg.includes('parking') || msg.includes('bike') || msg.includes('policy') || msg.includes('policies')) {
    content = Object.entries(hotelPolicies).map(([key, val]) =>
      `- **${key.charAt(0).toUpperCase() + key.slice(1)}:** ${val}`
    ).join('\n');
    dataSources = ['Hotel SOPs'];
  }

  // ---- HELP ----
  else if (msg.includes('help') || msg.includes('what can you')) {
    content = `### What I can do\n\n**Guest profiles**\n- "Tell me about James" — full profile with grill\n- "James loved the coffee tour" — I'll remember it\n- "Marie left half the breakfast" — noted for portions\n\n**Daily operations**\n- "Morning briefing" — what matters today\n- "Who's arriving tomorrow?" — with prep notes\n- "Pending services" — open tasks\n\n**Recommendations**\n- "Restaurant recommendations for Emma" — filtered by history\n- "Any dietary restrictions?" — kitchen prep\n\n**Quick answers**\n- "WiFi password" · "Breakfast hours" · "Checkout policy"\n- "Who's on duty?" · "Room occupancy"\n\n**The idea:** Talk to me like a colleague. I remember everything about every guest so your whole team stays in sync.`;
    dataSources = [];
  }

  // ---- FALLBACK ----
  else {
    content = `I'm not sure I caught that. Try:\n\n- **"Morning briefing"** — today's overview\n- **"Tell me about [guest name]"** — guest profile\n- **"[Guest] loved [something]"** — log a note\n- **"Pending services"** — open tasks\n- **"Help"** — everything I can do`;
    dataSources = [];
  }

  return {
    id: `msg-${Date.now()}`,
    role: 'assistant',
    content,
    timestamp: new Date(),
    dataSources,
  };
}
