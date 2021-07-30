class SongSerializer < ActiveModel::Serializer
  attributes :id, :name, :artist, :album, :year, :image
end
