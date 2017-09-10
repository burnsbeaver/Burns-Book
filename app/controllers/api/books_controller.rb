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
end
