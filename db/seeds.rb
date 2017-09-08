# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Book.destroy_all
Bet.destroy_all

newbook = Book.new(user_id: 2, balance: 0, active: true)

newbook.bets = [
  Bet.new(team: "Panthers", spread: 4.5, gameID: 'exid123qwe')
]

newbook.save
