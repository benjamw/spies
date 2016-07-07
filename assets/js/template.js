this["Templates"] = this["Templates"] || {};
this["Templates"]["create_team"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<!-- Create Team -->\r");t.b("\n" + i);t.b("<section>\r");t.b("\n" + i);t.b("  <p>");t.b(t.v(t.f("fail_count",c,p,0)));t.b(" fails are required to fail this mission.</p>\r");t.b("\n" + i);t.b("  <form method=\"get\" action=\"\" id=\"create_team_form\">\r");t.b("\n" + i);t.b("    <div class=\"row uniform\">\r");t.b("\n" + i);if(t.s(t.f("players",c,p,1),c,p,0,203,397,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <div class=\"12u\">\r");t.b("\n" + i);t.b("        <input type=\"checkbox\" id=\"player_");t.b(t.v(t.f("id",c,p,0)));t.b("\" name=\"player_");t.b(t.v(t.f("id",c,p,0)));t.b("\" class=\"team_player\"/>\r");t.b("\n" + i);t.b("        <label for=\"player_");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b(t.v(t.f("name",c,p,0)));t.b("</label>\r");t.b("\n" + i);t.b("      </div>\r");t.b("\n" + i);});c.pop();}t.b("      <div class=\"12u\">\r");t.b("\n" + i);t.b("        <input type=\"submit\" class=\"button special fit disabled\" value=\"Pick ");t.b(t.v(t.f("count",c,p,0)));t.b(" more players\" disabled=\"disabled\"/>\r");t.b("\n" + i);t.b("      </div>\r");t.b("\n" + i);t.b("    </div>\r");t.b("\n" + i);t.b("  </form>\r");t.b("\n" + i);t.b("</section>\r");t.b("\n");return t.fl(); },partials: {}, subs: {  }});
this["Templates"]["do_mission_pass"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<!-- Do Mission Pass -->\r");t.b("\n" + i);t.b("<section>\r");t.b("\n" + i);t.b("  <p>Pass the device to <strong>");t.b(t.v(t.f("name",c,p,0)));t.b("</strong></p>\r");t.b("\n" + i);t.b("  <hr class=\"major\">\r");t.b("\n" + i);t.b("  <h3>");t.b(t.v(t.f("name",c,p,0)));t.b(":</h3>\r");t.b("\n" + i);t.b("  <p><span class=\"button special fit\" id=\"do_mission\">Do Mission</span></p>\r");t.b("\n" + i);t.b("</section>\r");t.b("\n");return t.fl(); },partials: {}, subs: {  }});
this["Templates"]["error"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<!-- ERROR -->\r");t.b("\n" + i);t.b("<section id=\"banner\">\r");t.b("\n" + i);t.b("  <h1>There has been an Error!</h1>\r");t.b("\n" + i);t.b("  <p>");t.b(t.v(t.f("msg",c,p,0)));t.b("</p>\r");t.b("\n" + i);t.b("  <p>Refresh the page to get back to the game.</p>\r");t.b("\n" + i);t.b("</section>\r");t.b("\n");return t.fl(); },partials: {}, subs: {  }});
this["Templates"]["game_over"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<!-- Show Results -->\r");t.b("\n" + i);t.b("<section id=\"banner\">\r");t.b("\n" + i);t.b("  <h2><code>GAME OVER</code><br><br>\r");t.b("\n" + i);t.b("    The<br>\r");t.b("\n" + i);t.b("    ");if(t.s(t.f("resistance",c,p,1),c,p,0,116,158,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<span class=\"resistance\">Resistance</span>");});c.pop();}if(!t.s(t.f("resistance",c,p,1),c,p,1,0,0,"")){t.b("<span class=\"spy\">Spies</span>");};t.b("<br>\r");t.b("\n" + i);t.b("    have won!</h2>\r");t.b("\n" + i);t.b("</section>\r");t.b("\n" + i);t.b("<span class=\"button special fit\" id=\"view_all_alliances\">View Alliances</span>\r");t.b("\n");return t.fl(); },partials: {}, subs: {  }});
this["Templates"]["intro"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<!-- Intro -->\r");t.b("\n" + i);t.b("<div class=\"row\">\r");t.b("\n" + i);t.b("  <section class=\"6u 12u$(medium)\">\r");t.b("\n" + i);t.b("    <p>Enter player names in the order they are seated around the table.</p>\r");t.b("\n" + i);t.b("  </section>\r");t.b("\n" + i);t.b("  <section class=\"6u 12u$(medium)\">\r");t.b("\n" + i);t.b("    <ul id=\"players\"></ul>\r");t.b("\n" + i);t.b("    <form method=\"post\" action=\"\" id=\"players_entry_form\">\r");t.b("\n" + i);t.b("      <div class=\"row uniform 25%\">\r");t.b("\n" + i);t.b("        <div class=\"9u\">\r");t.b("\n" + i);t.b("          <input type=\"text\" name=\"name\" id=\"name\" value=\"\" placeholder=\"Name\"/>\r");t.b("\n" + i);t.b("        </div>\r");t.b("\n" + i);t.b("        <div class=\"3u\">\r");t.b("\n" + i);t.b("          <ul class=\"actions\">\r");t.b("\n" + i);t.b("            <li><input type=\"submit\" class=\"alt\" value=\"OK\"/></li>\r");t.b("\n" + i);t.b("          </ul>\r");t.b("\n" + i);t.b("        </div>\r");t.b("\n" + i);t.b("      </div>\r");t.b("\n" + i);t.b("    </form>\r");t.b("\n" + i);t.b("  </section>\r");t.b("\n" + i);t.b("</div>\r");t.b("\n" + i);t.b("<div class=\"row\">\r");t.b("\n" + i);t.b("  <section class=\"12u\">\r");t.b("\n" + i);t.b("    <span class=\"button special fit disabled\" id=\"start_game\">5 more players</span>\r");t.b("\n" + i);t.b("  </section>\r");t.b("\n" + i);t.b("</div>\r");t.b("\n");return t.fl(); },partials: {}, subs: {  }});
this["Templates"]["mission_done"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<!-- Mission Done -->\r");t.b("\n" + i);t.b("<section>\r");t.b("\n" + i);t.b("  <p>Place the device in the middle so everyone can see.</p>\r");t.b("\n" + i);t.b("  <hr class=\"major\">\r");t.b("\n" + i);t.b("  <p><span class=\"button special fit\" id=\"mission_done\">View Mission Results</span></p>\r");t.b("\n" + i);t.b("</section>\r");t.b("\n");return t.fl(); },partials: {}, subs: {  }});
this["Templates"]["mission_vote"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<!-- Team Vote -->");t.b("\n" + i);t.b("<section>");t.b("\n" + i);t.b("    <p>Cast your secret vote for the mission.<br>");t.b("\n" + i);t.b("      Remember, resistance members must always cast a 'Success' vote.</p>");t.b("\n" + i);t.b("    <p>");t.b(t.v(t.f("fail_count",c,p,0)));t.b(" fails are required to fail this mission.</p>");t.b("\n" + i);t.b("    <p>The button positions have been randomized.</p>");t.b("\n" + i);t.b("    <p>");t.b("\n" + i);t.b("    ");if(t.s(t.f("pre",c,p,1),c,p,0,294,298,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<br>");});c.pop();}t.b("\n" + i);if(t.s(t.f("alt",c,p,1),c,p,0,319,507,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <span class=\"button specialwrap big fit\" id=\"mission_success\">Success</span>");t.b("\n" + i);t.b("    ");if(t.s(t.f("post",c,p,1),c,p,0,414,418,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<br>");});c.pop();}t.b("\n" + i);t.b("    <span class=\"button warningwrap big fit\" id=\"mission_fail\">Fail</span>");t.b("\n" + i);});c.pop();}if(!t.s(t.f("alt",c,p,1),c,p,1,0,0,"")){t.b("    <span class=\"button warningwrap big fit\" id=\"mission_fail\">Fail</span>");t.b("\n" + i);t.b("    ");if(t.s(t.f("post",c,p,1),c,p,0,617,621,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<br>");});c.pop();}t.b("\n" + i);t.b("    <span class=\"button specialwrap big fit\" id=\"mission_success\">Success</span>");t.b("\n" + i);};t.b("    </p>");t.b("\n" + i);t.b("</section>");t.b("\n");return t.fl(); },partials: {}, subs: {  }});
this["Templates"]["script"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<!-- Script -->\r");t.b("\n" + i);t.b("<section>\r");t.b("\n" + i);t.b("  <ul>\r");t.b("\n" + i);t.b("    <li>Everyone close your eyes.</li>\r");t.b("\n" + i);t.b("    <li>Spies, open your eyes.</li>\r");t.b("\n" + i);t.b("    <li>Spies look around and make sure that you know all the other spies.</li>\r");t.b("\n" + i);t.b("    <li>Spies, close your eyes.</li>\r");t.b("\n" + i);t.b("    <li>Everyone's eyes should be closed.</li>\r");t.b("\n" + i);t.b("    <li>[Pause]</li>\r");t.b("\n" + i);t.b("    <li>Everyone open your eyes.</li>\r");t.b("\n" + i);t.b("  </ul>\r");t.b("\n" + i);t.b("  <hr class=\"major\">\r");t.b("\n" + i);t.b("  <span class=\"button special fit\" id=\"script_done\">Done</span>\r");t.b("\n" + i);t.b("</section>\r");t.b("\n");return t.fl(); },partials: {}, subs: {  }});
this["Templates"]["show_all_alliances"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<!-- Create Team -->\r");t.b("\n" + i);t.b("<section>\r");t.b("\n" + i);t.b("  <p>Player alliances:</p>\r");t.b("\n" + i);t.b("  <ul>\r");t.b("\n" + i);if(t.s(t.f("players",c,p,1),c,p,0,85,222,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <li class=\"");if(t.s(t.f("spy",c,p,1),c,p,0,110,113,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("spy");});c.pop();}if(!t.s(t.f("spy",c,p,1),c,p,1,0,0,"")){t.b("resistance");};t.b("\">");t.b(t.v(t.f("name",c,p,0)));t.b(" &mdash; ");if(t.s(t.f("spy",c,p,1),c,p,0,174,177,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("Spy");});c.pop();}if(!t.s(t.f("spy",c,p,1),c,p,1,0,0,"")){t.b("Resistance");};t.b("</li>\r");t.b("\n" + i);});c.pop();}t.b("  </ul>\r");t.b("\n" + i);t.b("  <p></p>\r");t.b("\n" + i);t.b("  <p>Click 'New Game' in the menu to begin again.</p>\r");t.b("\n" + i);t.b("</section>\r");t.b("\n");return t.fl(); },partials: {}, subs: {  }});
this["Templates"]["show_alliance"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<!-- Show Alliance -->\r");t.b("\n" + i);t.b("<section id=\"banner\">\r");t.b("\n" + i);t.b("  <h2>You are a<br>\r");t.b("\n" + i);t.b("    ");if(t.s(t.f("spy",c,p,1),c,p,0,80,108,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<span class=\"spy\">Spy</span>");});c.pop();}if(!t.s(t.f("spy",c,p,1),c,p,1,0,0,"")){t.b("<span class=\"resistance\">Resistance</span>");};t.b("</h2>\r");t.b("\n" + i);t.b("</section>\r");t.b("\n" + i);t.b("<p><span class=\"button special fit\" id=\"alliance_done\">Done</span></p>\r");t.b("\n");return t.fl(); },partials: {}, subs: {  }});
this["Templates"]["show_results"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<!-- Show Results -->\r");t.b("\n" + i);t.b("<section id=\"banner\">\r");t.b("\n" + i);t.b("  <h2>The mission<br>\r");t.b("\n" + i);t.b("    ");if(t.s(t.f("result",c,p,1),c,p,0,84,125,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<span class=\"resistance\">SUCCEEDED</span>");});c.pop();}if(!t.s(t.f("result",c,p,1),c,p,1,0,0,"")){t.b("<span class=\"spy\">FAILED</span>");};t.b("</h2>\r");t.b("\n" + i);t.b("  <p></p>\r");t.b("\n" + i);t.b("  <p><span class=\"resistance\">Successes: <strong>");t.b(t.v(t.f("successes",c,p,0)));t.b("</strong></span> | <span class=\"spy\">Fails: <strong>");t.b(t.v(t.f("fails",c,p,0)));t.b("</strong></span></p>\r");t.b("\n" + i);t.b("</section>\r");t.b("\n" + i);t.b("<p><span class=\"button special fit\" id=\"results_done\">Done</span></p>\r");t.b("\n");return t.fl(); },partials: {}, subs: {  }});
this["Templates"]["team_vote"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<!-- Team Vote -->");t.b("\n" + i);t.b("<section>");t.b("\n" + i);t.b("    <p>Have everyone vote on the given team and record that vote here.<br>");t.b("\n" + i);t.b("      This does not need to be a secret, but everyone should vote at the same time.</p>");t.b("\n" + i);t.b("    <p>The team:</p>");t.b("\n" + i);t.b("    <ul>");t.b("\n" + i);if(t.s(t.f("team",c,p,1),c,p,0,239,288,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("        <li><strong>");t.b(t.v(t.d(".",c,p,0)));t.b("</strong></li>");t.b("\n" + i);});c.pop();}t.b("    </ul>");t.b("\n" + i);t.b("    <span class=\"button special fit\" id=\"mission_vote_accept\">Team Accepted</span>");t.b("\n" + i);t.b("    <span class=\"button warning fit\" id=\"mission_vote_reject\">Team Rejected</span>");t.b("\n" + i);t.b("</section>");t.b("\n");return t.fl(); },partials: {}, subs: {  }});
this["Templates"]["view_alliance_pass"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<!-- View Alliance Pass -->\r");t.b("\n" + i);t.b("<section>\r");t.b("\n" + i);t.b("  <p>Pass the device to <strong>");t.b(t.v(t.f("name",c,p,0)));t.b("</strong></p>\r");t.b("\n" + i);t.b("  <hr class=\"major\">\r");t.b("\n" + i);t.b("  <h3>");t.b(t.v(t.f("name",c,p,0)));t.b(":</h3>\r");t.b("\n" + i);t.b("  <p><span class=\"button special fit\" id=\"show_alliance\">View Alliance</span></p>\r");t.b("\n" + i);t.b("</section>\r");t.b("\n");return t.fl(); },partials: {}, subs: {  }});
this["Templates"]["view_leader_pass"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<!-- View Leader Pass -->\r");t.b("\n" + i);t.b("<section>\r");t.b("\n" + i);t.b("  <p>Pass the device to <strong>");t.b(t.v(t.f("name",c,p,0)));t.b("</strong></p>\r");t.b("\n" + i);t.b("  <hr class=\"major\">\r");t.b("\n" + i);t.b("  <h3>");t.b(t.v(t.f("name",c,p,0)));t.b(":</h3>\r");t.b("\n" + i);t.b("  <p><span class=\"button special fit\" id=\"create_team\">Create Team</span></p>\r");t.b("\n" + i);t.b("</section>\r");t.b("\n");return t.fl(); },partials: {}, subs: {  }});