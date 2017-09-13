class Book < ApplicationRecord
  belongs_to :user
  has_many :bets, dependent: :destroy

  def self.create_new_book(user)
    puts 'route hit'
    puts user.id
    @user = User.find(user.id)
    puts @user
    @book = @user.books.create(balance: 0, active: true)
    @book
  end
end
