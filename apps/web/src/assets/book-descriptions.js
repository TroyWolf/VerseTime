// https://overviewbible.com/books-of-the-bible/

const descriptions = [
  [
    "Genesis",
    "Genesis answers two big questions: “How did God’s relationship with the world begin?” and “Where did the nation of Israel come from? Most of the famous Bible stories you’ve heard about are probably found in the book of Genesis. This is where the stories of Adam and Eve, Cain and Abel, Noah and the Ark, the Tower of Babel, Abraham and Isaac, Jacob’s ladder, and Joseph’s coat of many colors are recorded."
  ],
  [
    "Exodus",
    "God saves Israel from slavery in Egypt, and then enters into a special relationship with them."
  ],
  ["Leviticus", "God gives Israel instructions for how to worship Him."],
  [
    "Numbers",
    "Israel fails to trust and obey God, and wanders in the wilderness for 40 years."
  ],
  [
    "Deuteronomy",
    "Moses gives Israel instructions (in some ways, a recap of the laws in Exodus–Numbers) for how to love and obey God in the Promised Land."
  ],
  [
    "Joshua",
    "Joshua (Israel’s new leader) leads Israel to conquer the Promised land, then parcels out territories to the twelve tribes of Israel. You’ve probably heard of a few fantastic stories from this book (the Battle of Jericho and the day the sun stood still), but most of the action happens in the first half of this book. The last half is pretty much all about divvying up the real estate."
  ],
  [
    "Judges",
    "Israel enters a cycle of turning from God, falling captive to oppressive nations, calling out to God, and being rescued by leaders God sends their way (called “judges”)."
  ],
  [
    "Ruth",
    "Two widows lose everything, and find hope in Israel—which leads to the birth of the future King David."
  ],
  [
    "1 Samuel",
    "Israel demands a king, who turns out to be quite a disappointment."
  ],
  ["2 Samuel", "David, a man after God’s own heart, becomes king of Israel."],
  [
    "1 Kings",
    "The kingdom of Israel has a time of peace and prosperity under King Solomon, but afterward splits, and the two lines of kings turn away from God."
  ],
  [
    "2 Kings",
    "Both kingdoms ignore God and his prophets, until they both fall captive to other world empires."
  ],
  [
    "1 Chronicles",
    "This is a brief history of Israel from Adam to David, culminating with David commissioning the temple of God in Jerusalem."
  ],
  [
    "2 Chronicles",
    "David’s son Solomon builds the temple, but after centuries of rejecting God, the Babylonians take the southern Israelites captive and destroy the temple."
  ],
  [
    "Ezra",
    "The Israelites rebuild the temple in Jerusalem, and a scribe named Ezra teaches the people to once again obey God’s laws."
  ],
  [
    "Nehemiah",
    "The city of Jerusalem is in bad shape, so Nehemiah rebuilds the wall around the city."
  ],
  [
    "Esther",
    "Someone hatches a genocidal plot to bring about Israel’s extinction, and Esther must face the emperor to ask for help."
  ],
  [
    "Job",
    "Satan attacks a righteous man named Job, and Job and his friends argue about why terrible things are happening to him."
  ],
  [
    "Psalms",
    "A collection of 150 songs that Israel sang to God (and to each other)—kind of like a hymnal for the ancient Israelites."
  ],
  [
    "Proverbs",
    "A collection of sayings written to help people make wise decisions that bring about justice."
  ],
  [
    "Ecclesiastes",
    "A philosophical exploration of the meaning of life—with a surprisingly nihilistic tone for the Bible."
  ],
  [
    "Song of Solomon",
    "A love song (or collection of love songs) celebrating love, desire, and marriage."
  ],
  [
    "Isaiah",
    "God sends the prophet Isaiah to warn Israel of future judgment—but also to tell them about a coming king and servant who will “bear the sins of many.”"
  ],
  [
    "Jeremiah",
    "God sends a prophet to warn Israel about the coming Babylonian captivity, but the people don’t take the news very well."
  ],
  [
    "Lamentations",
    "A collection of dirges lamenting the fall of Jerusalem after the Babylonian attacks."
  ],
  [
    "Ezekiel",
    "God chooses a man to speak for Him to Israel, to tell them the error of their ways and teach them justice: Ezekiel."
  ],
  [
    "Daniel",
    "Daniel becomes a high-ranking wise man in the Babylonian and Persian empires, and has prophetic visions concerning Israel’s future."
  ],
  [
    "Hosea",
    "Hosea is told to marry a prostitute who leaves him, and he must bring her back: a picture of God’s relationship with Israel."
  ],
  [
    "Joel",
    "God sends a plague of locusts to Judge Israel, but his judgment on the surrounding nations is coming, too."
  ],
  [
    "Amos",
    "A shepherd named Amos preaches against the injustice of the Northern Kingdom of Israel."
  ],
  [
    "Obadiah",
    "Obadiah warns the neighboring nation of Edom that they will be judged for plundering Jerusalem."
  ],
  [
    "Jonah",
    "A disobedient prophet runs from God, is swallowed by a great fish, and then preaches God’s message to the city of Nineveh."
  ],
  [
    "Micah",
    "Micah confronts the leaders of Israel and Judah regarding their injustice, and prophecies that one day the Lord himself will rule in perfect justice."
  ],
  [
    "Nahum",
    "Nahum foretells of God’s judgment on Nineveh, the capital of Assyria."
  ],
  [
    "Habakkuk",
    "Habakkuk pleads with God to stop the injustice and violence in Judah, but is surprised to find that God will use the even more violent Babylonians to do so."
  ],
  [
    "Zephaniah",
    "God warns that he will judge Israel and the surrounding nations, but also that he will restore them in peace and justice."
  ],
  [
    "Haggai",
    "The people have abandoned the work of restoring God’s temple in Jerusalem, and so Haggai takes them to task."
  ],
  [
    "Zechariah",
    "The prophet Zechariah calls Israel to return to God, and records prophetic visions that show what’s happening behind the scenes."
  ],
  [
    "Malachi",
    "God has been faithful to Israel, but they continue to live disconnected from him—so God sends Malachi to call them out."
  ],
  [
    "Matthew",
    "This is an account of Jesus’ life, death, and resurrection, focusing on Jesus’ role as the true king of the Jews."
  ],
  [
    "Mark",
    "This brief account of Jesus’ earthly ministry highlights Jesus’ authority and servanthood."
  ],
  [
    "Luke",
    "Luke writes the most thorough account of Jesus’ life, pulling together eyewitness testimonies to tell the full story of Jesus."
  ],
  [
    "John",
    "John lists stories of signs and miracles with the hope that readers will believe in Jesus."
  ],
  [
    "Acts",
    "Jesus returns to the Father, the Holy Spirit comes to the church, and the gospel of Jesus spreads throughout the world."
  ],
  [
    "Romans",
    "Paul summarizes how the gospel of Jesus works in a letter to the churches at Rome, where he plans to visit."
  ],
  [
    "1 Corinthians",
    "Paul writes a disciplinary letter to a fractured church in Corinth, and answers some questions that they’ve had about how Christians should behave."
  ],
  [
    "2 Corinthians",
    "Paul writes a letter of reconciliation to the church at Corinth, and clears up some concerns that they have."
  ],
  [
    "Galatians",
    "Paul hears that the Galatian churches have been lead to think that salvation comes from the law of Moses, and writes a (rather heated) letter telling them where the false teachers have it wrong."
  ],
  [
    "Ephesians",
    "Paul writes to the church at Ephesus about how to walk in grace, peace, and love."
  ],
  [
    "Philippians",
    "An encouraging letter to the church of Philippi from Paul, telling them how to have joy in Christ."
  ],
  [
    "Colossians",
    "Paul writes the church at Colossae a letter about who they are in Christ, and how to walk in Christ."
  ],
  [
    "1 Thessalonians",
    "Paul has heard a good report on the church at Thessalonica, and encourages them to “excel still more” in faith, hope, and love."
  ],
  [
    "2 Thessalonians",
    "Paul instructs the Thessalonians on how to stand firm until the coming of Jesus."
  ],
  [
    "1 Timothy",
    "Paul gives his protegé Timothy instruction on how to lead a church with sound teaching and a godly example."
  ],
  [
    "2 Timothy",
    "Paul is nearing the end of his life, and encourages Timothy to continue preaching the word."
  ],
  [
    "Titus",
    "Paul advises Titus on how to lead orderly, counter-cultural churches on the island of Crete."
  ],
  [
    "Philemon",
    "Paul strongly recommends that Philemon accept his runaway slave as a brother, not a slave."
  ],
  [
    "Hebrews",
    "A letter encouraging Christians to cling to Christ despite persecution, because he is greater."
  ],
  [
    "James",
    "A letter telling Christians to live in ways that demonstrate their faith in action."
  ],
  [
    "1 Peter",
    "Peter writes to Christians who are being persecuted, encouraging them to testify to the truth and live accordingly."
  ],
  [
    "2 Peter",
    "Peter writes a letter reminding Christians about the truth of Jesus, and warning them that false teachers will come."
  ],
  [
    "1 John",
    "John writes a letter to Christians about keeping Jesus’ commands, loving one another, and important things they should know."
  ],
  [
    "2 John",
    "A very brief letter about walking in truth, love, and obedience."
  ],
  ["3 John", "An even shorter letter about Christian fellowship."],
  [
    "Jude",
    "A letter encouraging Christians to contend for the faith, even though ungodly persons have crept in unnoticed."
  ],
  [
    "Revelation",
    "John sees visions of things that have been, things that are, and things that are yet to come."
  ]
]

export default descriptions