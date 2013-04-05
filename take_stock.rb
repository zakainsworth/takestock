require 'sinatra/base'
require 'open-uri'
require 'json'

class TakeStock < Sinatra::Base
  get '/' do
    erb :index
  end

  get '/quote' do
    quote_data = quote(params[:symbol])
    quote_data['c'].to_f < 0 ? change_class = 'label-important' : change_class = 'label-success'
    erb :quote, :locals => {:quote_data => quote_data, :change_class => change_class}
  end

  def quote(symbol)
    base_url = 'http://www.google.com/finance/info?infotype=infoquoteall&q='
    JSON.load(open("#{base_url}#{symbol}").read.gsub(/^\/\//, ''))[0]
  end
end