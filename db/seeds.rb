# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Song.destroy_all
Comment.destroy_all
Like.destroy_all

User.reset_pk_sequence
Song.reset_pk_sequence
Comment.reset_pk_sequence
Like.reset_pk_sequence

puts "Creating users..."
users = ["Kyle", "Nisa", "Greg", "Arthur", "Lucy", "Adrienne", "Carlos", "Edward", "Ryan", "Brendan", "Kenny", "Terry", "Shevon", "Adreena", "Zeus", "Darren", "Jack", "Dan"]
users.each {|user| User.create(name: user, username: "#{user}#{rand(1..100)}")}

puts "Seeding Songs..."
Song.create!([
  {
    name: "Happier Than Ever",
    artist: "Billie Eilish",
    album: "Happier Than Ever",
    year: 2021,
    image: "https://i.scdn.co/image/ab67616d0000b27339a3fc014b4c3a6af1c2458f"
  },
  {
    name: "STAY (with Justin Bieber)",
    artist: "The Kid LAROI",
    album: "STAY (with Justin Bieber)",
    year: 2021,
    image: "https://i.scdn.co/image/ab67616d0000b27341e31d6ea1d493dd77933ee5"
  },
  {
    name: "Bad Habits",
    artist: "Ed Sheeran",
    album: "Bad Habits",
    year: 2021,
    image: "https://i.scdn.co/image/ab67616d0000b27314a5222ca8fdf13d5c050496"
  }
])

puts "Creating comments..."
Comment.create!([
  {
    content: "great song!",
    user_id: User.ids.sample,
    song_id: Song.ids.sample
  },
  {
    content: "boring",
    user_id: User.ids.sample,
    song_id: Song.ids.sample
  },
  {
    content: "so fun",
    user_id: User.ids.sample,
    song_id: Song.ids.sample
  },
  {
    content: "idk about this one",
    user_id: User.ids.sample,
    song_id: Song.ids.sample
  },
  {
    content: "a bop",
    user_id: User.ids.sample,
    song_id: Song.ids.sample
  },
  {
    content: "listening on repeat",
    user_id: User.ids.sample,
    song_id: Song.ids.sample
  }
])

puts "Creating likes..."
20.times do 
    Like.create!(user_id: User.ids.sample, song_id: Song.ids.sample)
end

puts "Done seeding!"