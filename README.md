# spies
https://benjamw.github.io/spies/

A browser based version of the game The Resistance

---------------------------------------------------------------------

## Building and Installing

### Prerequisites

- Node.js/npm
- git
- sass `npm install -g sass`
- grunt `npm install -g grunt-cli`

1. Clone the repository
2. Change directory to the repository
3. Install dependencies
```
npm install
```
4. Build the CSS and templates
```
grunt
```

There is an old dependency on Compass, which has been deprecated.

There is no replacement SASS compiler set up for this repo yet.

---------------------------------------------------------------------

## Game Rules

### Goals:
- The Resistance (BLUE) operatives must successfully pass 3/5 missions, while the Spies (RED)
  must cause 3/5 of the missions to fail.
- If during any rounds a proposed "mission team" cannot be agreed to (if five different
  teams are proposed in a row and all are not approved) then the Spies (RED) win.

### Set-Up:
- follow directions on the Spies HTML website or single-page app.

### Game Play:
- each round starts by giving each player two vote cards (Reject / Approve) used to determine which
  players are to be included in the mission teams.
- determine "Team Leader" - for the first round it is random; after that it goes clockwise around the
  table. Give that player the Team Leader card.
- the Team Leader passes out team cards to players who he wants to be on the mission; refer to the
  chart to determine how many members are required.
- ALL players vote simultaneously on whether to "Accept" or "Reject" the mission team's
  composition. If there is majority approval the team is finalized. If not, then the Team Leader
  card passes to player left of the current one. Repeat same procedure.
- once a Mission Team is approved, then each player on the team receives two missions
  cards: one "Failure" (RED) and one "Success" (BLUE).
- Mission team members secretly vote on whether the mission fails or succeeds by placing face down
  one of the two cards, which are shuffled and then revealed.
  - if there is at least one Fail card the mission fails. Place a red token on the chart.
  - if all the cards are Success then a blue token is placed on the chart.

  - * **Exception**: for Mission #4, **_sometimes two_** Fail cards are required to fail it.
- shuffle together all the Mission cards (used and unused) and divide into two piles.

### Plot Cards (5-10 players):
- the optional expansion, "The Plot Thickens," includes 15 additional cards.
- Team Leader for each round draws a specified amount (5/6 players = 1, 7-8 players = 2,
  9-10 players = 3) and gives them to any players he wants (he cannot keep them)
- these cards give the holding players special abilities for the round they are used.
- plot cards are not secret but are placed face up as soon as they are drawn.
- those with a star symbol are used immediately and then discarded; those with a square
  icon remain in play for the entire game, and those with a “1” are held until used.
- cards are played in turn order, if desired.
