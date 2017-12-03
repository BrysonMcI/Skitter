require 'elasticsearch'

class RepliesController < ApplicationController
  def addskitreply
	information = request.raw_post
	data = JSON.parse(information)

	data['id'] = "1"

	#Check if post identified exists

	#Make our post

	#Travel to last linked reply and put our reference in

	#Add reference to our post to og post

	render :json => { :error => "None" }
  end

  def removeskitreply
	information = request.raw_post
	data = JSON.parse(information)

	#Check if what we want to delete exists and we own it

	#Update the post above the one we want to delete with new references

	#Update the post below the one we want to delete with new references

	#Delete our post

	render :json => { :error => "None" }
  end
end
