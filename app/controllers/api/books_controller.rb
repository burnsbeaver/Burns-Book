class Api::BooksController < ApplicationController
  before_action :authenticate_user!
  def index
    @user = current_user
    @book = @user.books.where(active: true).first
    render json: @book
  end
  def show
    @user = current_user
    @book = @user.books.where(active: true).first
    @openbets = @book.bets.where(open: true)
    @closedbets = @book.bets.where(open: false)
    render json: {
      open: @openbets,
      closed: @closedbets
    }
  end
  # update
    #for each
  #end
  def resolve
    @user = current_user
    @book = @user.books.where(active: true).first
    @openbets = @book.bets.where(open: true)
    @time = Time.new
    @openbets.each do |bet|
      #make axios call, save it as res

      res = {Final: true, HomeScore: nil, AwayScore: nil}
      res[:HomeScore] = rand(30)
      res[:AwayScore] = rand(25)

      if res[:Final]
        bet[:open] = false
        if bet[:homeTeam]
          if bet[:spread] < 0
            if (res[:HomeScore] - res[:AwayScore]) > bet[:spread].abs
              bet[:win] = 'win'
            elsif (res[:HomeScore] - res[:AwayScore]) < bet[:spread].abs
              bet[:win] = 'loss'
            else
              bet[:win] = 'draw'
            end
          elsif bet[:spread] > 0
            if (res[:HomeScore] + bet[:spread]) > res[:AwayScore]
              bet[:win] = 'win'
            elsif (res[:HomeScore] + bet[:spread]) < res[:AwayScore]
              bet[:win] = 'loss'
            else
              bet[:win] = 'draw'
            end
          else
            if res[:HomeScore] > res[:AwayScore]
              bet[:win] = 'win'
            else
              bet[:win] = 'loss'
            end
          end
        else
          if bet[:spread] < 0
            if (res[:AwayScore] - res[:HomeScore]) > bet[:spread].abs
              bet[:win] = 'win'
            elsif (res[:AwayScore] - res[:HomeScore]) < bet[:spread].abs
              bet[:win] = 'loss'
            else
              bet[:win] = 'draw'
            end
          elsif bet[:spread] > 0
            if (res[:AwayScore] + bet[:spread]) > res[:HomeScore]
              bet[:win] = 'win'
            elsif (res[:AwayScore] + bet[:spread]) < res[:HomeScore]
              bet[:win] = 'loss'
            else
              bet[:win] = 'draw'
            end
          else
            if res[:AwayScore] > res[:HomeScore]
              bet[:win] = 'win'
            else
              bet[:win] = 'loss'
            end
          end
        end
        bet.save
      end
    end
    @closedbets = @book.bets.where(open: false)
    @number = 0
    @closedbets.each do |bet|
      if bet.win == 'win'
        @number = @number + bet.payout
      elsif bet.win == 'loss'
        @number = @number - bet.risk
      end
    end
    @book[:balance] = @number
    @book.save
    render json: @book
  end
end
