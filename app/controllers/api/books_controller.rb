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
    # find the bet.
    @openbets.each do |bet|
      #make axios call, save it as res

      if res.Final
        bet.open = false
        if bet.homeTeam
          if bet.spread < 0
            if (res.HomeScore - res.AwayScore) > bet.spread.abs
              bet.win = 'win'
            elsif (res.HomeScore - res.AwayScore) < bet.spread.abs
              bet.win = 'loss'
            else
              bet.win = 'draw'
            end
          elsif bet.spread > 0
            if (res.HomeScore + bet.spread) > res.AwayScore
              bet.win = 'win'
            elsif (res.HomeScore + bet.spread) < res.AwayScore
              bet.win = 'loss'
            else
              bet.win = 'draw'
            end
          else
            if res.HomeScore > res.AwayScore
              res.win = 'win'
            else
              res.win = 'loss'
            end
          end
        else
          if bet.spread < 0
            if (res.AwayScore - res.HomeScore) > bet.spread.abs
              bet.win = 'win'
            elsif (res.AwayScore - res.HomeScore) < bet.spread.abs
              bet.win = 'loss'
            else
              bet.win = 'draw'
            end
          elsif bet.spread > 0
            if (res.AwayScore + bet.spread) > res.HomeScore
              bet.win = 'win'
            elsif (res.AwayScore + bet.spread) < res.HomeScore
              bet.win = 'loss'
            else
              bet.win = 'draw'
            end
          else
            if res.AwayScore > res.HomeScore
              res.win = 'win'
            else
              res.win = 'loss'
            end
          end
        end

      end
    end
    # extract home or away, spread, payout and risk. (maybe entire bet object?)
    # Use the game ID to find the final score of the game via jsonodds api call
    # Find out if team covered
    # change bet to closed
    # if win -> change win to true, and send the payout to the book controller
    # if loss -> change win to false, and send the risk to the payout controller (could just send an integer, change it to negative if false)
    render json: @book
  end
end
