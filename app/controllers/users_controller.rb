class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index
        users = User.all
        render json: users
    end

    def create
        user = User.create!(user_params)
        render json: user, status: :created
    end

    def show 
        user = find_user
        render json: user
    end

    def destroy
        user = find_user
        user.destroy
        render json: {}
    end

    def user_posts
        user = find_user
        user_posts = user.posts
        render json: user_posts
    end

    private

    def find_user
        User.find(params[:id])
    end

    def user_params
        params.permit(:name, :username, :password)
    end

    def render_unprocessable_entity_response(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end
    
    def render_not_found_response
        render json: { error: "User not found" }, status: :not_found
    end

end
