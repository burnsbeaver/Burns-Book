class Book < ApplicationRecord
  belongs_to :user
  has_many :bets, dependent: :destroy
end
