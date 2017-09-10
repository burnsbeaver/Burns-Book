class Api::BetsController < ApplicationController
  before_action :authenticate_user!
  def create
    @user = current_user
    @book = @user.books.where(active: true).first
    @bet = @book.bets.new bet_params

    if @bet.save
      render json: @bet
    else
      render json: {
        message: 'Error when validating bet, please cancel and try again'
      }
    end
  end
  # def update
  # find the bet.

  # extract home or away, spread, payout and risk. (maybe entire bet object?)
  # Use the game ID to find the final score of the game via jsonodds api call
  # Find out if team covered
  # change bet to closed
  # if win -> change win to true, and send the payout to the book controller
  # if loss -> change win to false, and send the risk to the payout controller (could just send an integer, change it to negative if false)

  # end


  private

  def bet_params
    params.require(:bet).permit(:spread, :team, :gameID, :start, :oddtype, :open, :payout, :hometeam, :risk)
  end
end
