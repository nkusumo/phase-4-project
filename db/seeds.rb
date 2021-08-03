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
Post.destroy_all

User.reset_pk_sequence
Song.reset_pk_sequence
Comment.reset_pk_sequence
Like.reset_pk_sequence
Post.reset_pk_sequence

puts "Creating users..."
users = ["Kyle", "Nisa", "Greg", "Arthur", "Lucy", "Adrienne", "Carlos", "Edward", "Ryan", "Brendan", "Kenny", "Terry", "Shevon", "Adreena", "Zeus", "Darren", "Jack", "Dan"]
users.each {|user| User.create(name: user, username: "#{user}#{rand(1..100)}", password: "pass123")}

puts "Seeding Songs..."
Song.create!([
  {
    spotifyID: "4RVwu0g32PAqgUiJoXsdF8"
  },
  {
    spotifyID: "5HCyWlXZPP0y6Gqq8TgA20"
  },
  {
    spotifyID: "6PQ88X9TkUIAUIZJHW2upE"
  }
])

puts "Seeding Posts..."
10.times do 
  Post.create!(user_id: User.ids.sample, song_id: Song.ids.sample)
end

puts "Creating comments..."
Comment.create!([
  {
    content: "great song!",
    user_id: User.ids.sample,
    post_id: Post.ids.sample
  },
  {
    content: "boring",
    user_id: User.ids.sample,
    post_id: Post.ids.sample
  },
  {
    content: "so fun",
    user_id: User.ids.sample,
    post_id: Post.ids.sample
  },
  {
    content: "idk about this one",
    user_id: User.ids.sample,
    post_id: Post.ids.sample
  },
  {
    content: "a bop",
    user_id: User.ids.sample,
    post_id: Post.ids.sample
  },
  {
    content: "listening on repeat",
    user_id: User.ids.sample,
    post_id: Post.ids.sample
  }
])

puts "Creating likes..."
20.times do 
    Like.create!(user_id: User.ids.sample, post_id: Post.ids.sample)
end

puts "Done seeding!"