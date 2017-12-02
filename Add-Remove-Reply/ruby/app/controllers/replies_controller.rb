require 'elasticsearch'

class RepliesController < ApplicationController
  def addreply
	message = { :error => "None" }
	render :json => message
  end

  def removereply
	message = { :error => "None" }
	render :json => message
  end
end
