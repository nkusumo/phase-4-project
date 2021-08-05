class CommentsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def create
        comment = Comment.create!(comment_params)
        render json: comment, status: :created
    end

    def destroy
        comment = find_comment
        comment.destroy
        render json: {}
    end

    private

    def find_comment
        Comment.find(params[:id])
    end

    def comment_params
        params.permit(:content, :user_id, :post_id)
    end

    def render_unprocessable_entity_response(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end
    def render_not_found_response
        render json: { error: "Comment not found" }, status: :not_found
    end

end
